import { Controller } from '@nestjs/common';
import { SchoolsService } from './schools.service';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}
}
