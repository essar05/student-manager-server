import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }
}
