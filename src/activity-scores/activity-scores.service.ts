import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityScore } from './activity-score.entity';

@Injectable()
export class ActivityScoresService {
  constructor(
    @InjectRepository(ActivityScore)
    private activityScoreRepository: Repository<ActivityScore>,
  ) {}

  async add(studentToClassId: number, score: number): Promise<ActivityScore> {
    const result = await this.activityScoreRepository.insert({
      score,
      studentToClassId,
    });

    const insertedId = result.identifiers[0].id;

    if (insertedId) {
      return this.activityScoreRepository.findOne({
        where: { id: insertedId },
      });
    }
  }

  async delete(studentToClassId: number, id: number): Promise<void> {
    await this.activityScoreRepository.delete({
      id,
    });
  }
}
