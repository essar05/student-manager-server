import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "./class.entity";

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>
  ) {
  }

  findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  findOne(id: number): Promise<Class> {
    return this.classRepository.findOne({
      relations: ['students'],
      where: { id: id },
    });

     // .findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
