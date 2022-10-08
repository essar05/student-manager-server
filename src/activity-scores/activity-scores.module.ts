import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityScore } from './activity-score.entity';
import { ActivityScoresService } from './activity-scores.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityScore])],
  controllers: [],
  providers: [ActivityScoresService],
  exports: [TypeOrmModule, ActivityScoresService],
})
export class ActivityScoresModule {}
