import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InsertStudentDto } from './student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() params,
    @Body() studentDto: InsertStudentDto,
  ): Promise<Student> {
    return this.studentsService.update(params.id, studentDto);
  }
}
