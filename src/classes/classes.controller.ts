import { Controller, Get, Param } from '@nestjs/common';
import { ClassesService } from "./classes.service";
import { Class } from "./class.entity";

@Controller('classes')
export class ClassesController {

  constructor(private classesService: ClassesService) {
  }

  @Get()
  async getAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Class> {
    return this.classesService.findOne(params.id);
  }

}
