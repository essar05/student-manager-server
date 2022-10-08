import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissingHomework } from './missing-homework.entity';
import { MissingHomeworksService } from './missing-homeworks.service';

@Module({
  imports: [TypeOrmModule.forFeature([MissingHomework])],
  controllers: [],
  providers: [MissingHomeworksService],
  exports: [TypeOrmModule, MissingHomeworksService],
})
export class MissingHomeworksModule {}
