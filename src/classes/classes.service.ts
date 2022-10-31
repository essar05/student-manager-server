import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { StudentToClass } from '../student-to-class/student-to-class.entity';
import { ActivityPoint } from '../activity-points/activity-point.entity';
import { MissingHomework } from '../missing-homeworks/missing-homework.entity';
import { LoudnessWarning } from '../loudness-warnings/loudness-warning.entity';
import { PostClassDto } from './classes.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(ActivityPoint)
    private activityPointRepository: Repository<ActivityPoint>,
    @InjectRepository(MissingHomework)
    private missingHomeworkRepository: Repository<MissingHomework>,
    @InjectRepository(LoudnessWarning)
    private loudnessWarningRepository: Repository<LoudnessWarning>,
  ) {}

  findAll(): Promise<Class[]> {
    return this.classRepository.find({
      relations: ['school'],
      order: {
        schoolYear: 'ASC',
        label: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Class> {
    const class_ = await this.classRepository.findOne({
      relations: {
        studentsPerformance: {
          student: true,
          activityScores: true,
        },
        school: true,
      },
      where: { id: id },
      order: {
        studentsPerformance: {
          student: { lastName: 'ASC' },
          activityScores: { createdAt: 'ASC' },
        },
      },
    });

    if (!class_) {
      return null;
    }

    const pointsToStudentQuery = await this.activityPointRepository
      .createQueryBuilder('ap')
      .select('SUM(ap.points)', 'activityPoints')
      .addSelect('ap.studentToClassId', 'studentToClassId')
      .innerJoin(StudentToClass, 'stc', 'stc.id = ap.studentToClassId')
      .groupBy('ap.studentToClassId')
      .where('stc.classId = :id', { id });

    const pointsToStudent = await pointsToStudentQuery.getRawMany<{
      activityPoints: string;
      studentToClassId: number;
    }>();

    const missingHomeworksToStudent = await this.missingHomeworkRepository
      .createQueryBuilder('mh')
      .select('SUM(mh.amount)', 'missingHomeworks')
      .addSelect('mh.studentToClassId', 'studentToClassId')
      .innerJoin(StudentToClass, 'stc', 'stc.id = mh.studentToClassId')
      .groupBy('mh.studentToClassId')
      .where('stc.classId = :id', { id })
      .getRawMany<{
        missingHomeworks: string;
        studentToClassId: number;
      }>();

    const loudnessWarningsToStudent = await this.loudnessWarningRepository
      .createQueryBuilder('lw')
      .select('COUNT(lw.id)', 'loudnessWarnings')
      .addSelect('lw.studentToClassId', 'studentToClassId')
      .innerJoin(StudentToClass, 'stc', 'stc.id = lw.studentToClassId')
      .groupBy('lw.studentToClassId')
      .where('stc.classId = :id', { id })
      .getRawMany<{
        loudnessWarnings: string;
        studentToClassId: number;
      }>();

    class_.studentsPerformance.forEach((studentInClass) => {
      studentInClass.activityPoints =
        parseInt(
          pointsToStudent.find(
            (pts) => pts.studentToClassId === studentInClass.id,
          )?.activityPoints,
        ) || 0;

      studentInClass.missingHomeworks =
        parseFloat(
          missingHomeworksToStudent.find(
            (pts) => pts.studentToClassId === studentInClass.id,
          )?.missingHomeworks,
        ) || 0;

      studentInClass.loudnessWarnings =
        parseInt(
          loudnessWarningsToStudent.find(
            (pts) => pts.studentToClassId === studentInClass.id,
          )?.loudnessWarnings,
        ) || 0;
    });

    return class_;
  }

  async insert(dto: PostClassDto): Promise<Class> | null {
    const existingClass = await this.classRepository.findOne({
      where: {
        ...dto,
        label: dto.label.toUpperCase().slice(0, 1),
      },
    });

    if (existingClass) {
      throw new BadRequestException('O clasa cu aceste date exista deja');
    }

    const result = await this.classRepository.insert({
      ...dto,
      label: dto.label.toUpperCase().slice(0, 1),
    });

    const insertedId = result.identifiers[0].id;

    if (insertedId) {
      return this.findOne(insertedId);
    }

    return null;
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
