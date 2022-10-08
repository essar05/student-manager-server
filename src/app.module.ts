import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { SchoolsModule } from './schools/schools.module';
import { ActivityScoresModule } from './activity-scores/activity-scores.module';
import { StudentToClassModule } from './student-to-class/student-to-class.module';
import { ActivityPointsModule } from './activity-points/activity-points.module';
import { LoudnessWarningsModule } from './loudness-warnings/loudness-warnings.module';
import { MissingHomeworksModule } from './missing-homeworks/missing-homeworks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user1',
      password: 'password1',
      database: 'points_maria',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      timezone: 'Z',
    }),
    StudentsModule,
    ClassesModule,
    SchoolsModule,
    StudentToClassModule,
    ActivityScoresModule,
    ActivityPointsModule,
    LoudnessWarningsModule,
    MissingHomeworksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
