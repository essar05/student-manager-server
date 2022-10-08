import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ActivityPointsModule } from '../activity-points/activity-points.module';
import { LoudnessWarningsModule } from '../loudness-warnings/loudness-warnings.module';
import { MissingHomeworksModule } from '../missing-homeworks/missing-homeworks.module';
import { ActivityScoresModule } from '../activity-scores/activity-scores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    ActivityScoresModule,
    ActivityPointsModule,
    LoudnessWarningsModule,
    MissingHomeworksModule,
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [TypeOrmModule],
})
export class ClassesModule {}
