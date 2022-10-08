import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoudnessWarning } from './loudness-warning.entity';
import { LoudnessWarningsService } from './loudness-warnings.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoudnessWarning])],
  controllers: [],
  providers: [LoudnessWarningsService],
  exports: [TypeOrmModule, LoudnessWarningsService],
})
export class LoudnessWarningsModule {}
