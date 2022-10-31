import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentToClass } from './student-to-class.entity';

@Injectable()
export class StudentToClassService {
  constructor(
    @InjectRepository(StudentToClass)
    private repository: Repository<StudentToClass>,
  ) {}

  findAll(): Promise<StudentToClass[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<StudentToClass> {
    return this.repository.findOneBy({ id });
  }

  async insert(classId: number, studentId: number): Promise<void> {
    await this.repository.insert({ classId, studentId });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async updateInitialTestScore(id: number, score: number): Promise<void> {
    await this.repository.update({ id }, { initialTestScore: score });
  }
}
