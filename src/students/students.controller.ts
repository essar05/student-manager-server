import { Controller, Get } from '@nestjs/common';
import { StudentsService } from "./students.service";
import { Student } from "./student.entity";

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll()
  }
}
