import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPoint } from './activity-point.entity';
import { ActivityPointsService } from './activity-points.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityPoint])],
  controllers: [],
  providers: [ActivityPointsService],
  exports: [TypeOrmModule, ActivityPointsService],
})
export class ActivityPointsModule {}
