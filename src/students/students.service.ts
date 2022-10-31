import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { InsertStudentDto } from './student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(id: number): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  async insert(dto: InsertStudentDto): Promise<Student> {
    const existingStudent = await this.studentRepository.findOne({
      where: dto,
    });

    if (existingStudent) {
      throw new BadRequestException('Un elev cu acest nume exista deja');
    }

    const result = await this.studentRepository.insert(dto);
    const insertedId = result.identifiers[0].id;

    if (insertedId) {
      return this.findOne(insertedId);
    }
  }

  async update(id: number, dto: InsertStudentDto): Promise<Student> {
    const existingStudent = await this.studentRepository.findOneBy({ id });

    if (!existingStudent) {
      throw new BadRequestException('Elevul nu exista');
    }

    await this.studentRepository.update({ id }, dto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
