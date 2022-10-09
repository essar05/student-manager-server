import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissingHomework } from './missing-homework.entity';

@Injectable()
export class MissingHomeworksService {
  constructor(
    @InjectRepository(MissingHomework)
    private missingHomeworkRepository: Repository<MissingHomework>,
  ) {}

  async add(studentToClassId: number): Promise<void> {
    await this.missingHomeworkRepository.insert({
      studentToClassId,
    });
  }

  async deleteLast(studentToClassId: number): Promise<void> {
    const lastEntry = await this.missingHomeworkRepository.findOne({
      where: { studentToClassId },
      order: { id: 'DESC' },
    });

    if (lastEntry?.id) {
      await this.missingHomeworkRepository.delete({ id: lastEntry.id });
    }
  }
}
