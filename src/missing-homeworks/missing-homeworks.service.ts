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

  async add(studentToClassId: number, amount: number): Promise<void> {
    await this.missingHomeworkRepository.insert({
      studentToClassId,
      amount,
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

  async getSum(studentToClassId: number): Promise<number> {
    return parseFloat(
      await this.missingHomeworkRepository
        .createQueryBuilder('mh')
        .select('SUM(mh.amount)', 'missingHomeworks')
        .where('mh.studentToClassId = :studentToClassId', { studentToClassId })
        .getRawOne(),
    );
  }
}
