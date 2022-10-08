import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityPoint } from './activity-point.entity';

@Injectable()
export class ActivityPointsService {
  constructor(
    @InjectRepository(ActivityPoint)
    private activityPointRepository: Repository<ActivityPoint>,
  ) {}

  async add(studentToClassId: number, points: number): Promise<void> {
    await this.activityPointRepository.insert({
      points,
      studentToClassId,
    });
  }
}
