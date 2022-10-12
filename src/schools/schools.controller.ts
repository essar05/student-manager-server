import { Controller, Get, UseGuards } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { School } from './school.entity';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<School[]> {
    return this.schoolsService.findAll();
  }
}
