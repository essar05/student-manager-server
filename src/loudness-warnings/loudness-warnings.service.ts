import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoudnessWarning } from './loudness-warning.entity';

@Injectable()
export class LoudnessWarningsService {
  constructor(
    @InjectRepository(LoudnessWarning)
    private loudnessWarningRepository: Repository<LoudnessWarning>,
  ) {}

  async add(studentToClassId: number): Promise<void> {
    await this.loudnessWarningRepository.insert({
      studentToClassId,
    });
  }

  async deleteLast(studentToClassId: number): Promise<void> {
    const lastEntry = await this.loudnessWarningRepository.findOne({
      where: { studentToClassId },
      order: { id: 'DESC' },
    });

    if (lastEntry?.id) {
      await this.loudnessWarningRepository.delete({ id: lastEntry.id });
    }
  }
}
