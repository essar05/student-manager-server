import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentToClass } from './student-to-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentToClass])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class StudentToClassModule {}
