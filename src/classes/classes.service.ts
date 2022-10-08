import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { StudentToClass } from '../student-to-class/student-to-class.entity';
import { ActivityPoint } from '../activity-points/activity-point.entity';
import { MissingHomework } from '../missing-homeworks/missing-homework.entity';
import { LoudnessWarning } from '../loudness-warnings/loudness-warning.entity';

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
    });

    const pointsToStudentQuery = await this.activityPointRepository
      .createQueryBuilder('ap')
      .select('SUM(ap.points)', 'activityPoints')
      .addSelect('ap.studentToClassId', 'studentToClassId')
      .innerJoin(StudentToClass, 'stc', 'stc.id = ap.studentToClassId')
      .groupBy('ap.studentToClassId')
      .where('stc.classId = :id', { id });

    const pointsToStudent = await pointsToStudentQuery.getRawMany<{
      activityPoints: number;
      studentToClassId: number;
    }>();

    const missingHomeworksToStudent = await this.missingHomeworkRepository
      .createQueryBuilder('mh')
      .select('COUNT(mh.id)', 'missingHomeworks')
      .addSelect('mh.studentToClassId', 'studentToClassId')
      .innerJoin(StudentToClass, 'stc', 'stc.id = mh.studentToClassId')
      .groupBy('mh.studentToClassId')
      .where('stc.classId = :id', { id })
      .getRawMany<{
        missingHomeworks: number;
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
        loudnessWarnings: number;
        studentToClassId: number;
      }>();

    console.log(pointsToStudent);

    class_.studentsPerformance.forEach((studentInClass) => {
      studentInClass.activityPoints =
        pointsToStudent.find(
          (pts) => pts.studentToClassId === studentInClass.id,
        )?.activityPoints || 0;

      studentInClass.missingHomeworks =
        missingHomeworksToStudent.find(
          (pts) => pts.studentToClassId === studentInClass.id,
        )?.missingHomeworks || 0;

      studentInClass.loudnessWarnings =
        loudnessWarningsToStudent.find(
          (pts) => pts.studentToClassId === studentInClass.id,
        )?.loudnessWarnings || 0;
    });

    return class_;
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
