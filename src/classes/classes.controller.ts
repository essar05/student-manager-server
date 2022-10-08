import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.entity';
import { ActivityScoresService } from '../activity-scores/activity-scores.service';
import { ActivityPointsService } from '../activity-points/activity-points.service';
import { MissingHomeworksService } from '../missing-homeworks/missing-homeworks.service';
import { LoudnessWarningsService } from '../loudness-warnings/loudness-warnings.service';

@Controller('classes')
export class ClassesController {
  constructor(
    private classesService: ClassesService,
    private activityScoresService: ActivityScoresService,
    private activityPointsService: ActivityPointsService,
    private missingHomeworksService: MissingHomeworksService,
    private loudnessWarningsService: LoudnessWarningsService,
  ) {}

  @Get()
  async getAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Class> {
    return this.classesService.findOne(params.id);
  }

  @Post(':classId/studentsPerformance/:studentToClassId/activityScores')
  async addActivityScore(
    @Param() params,
    @Body() postActivityScoreDto: PostActivityScoreDto,
  ): Promise<Class> {
    await this.activityScoresService.add(
      params.studentToClassId,
      postActivityScoreDto.score,
    );

    return this.classesService.findOne(params.classId);
  }

  @Post(':classId/studentsPerformance/:studentToClassId/activityPoints')
  async addActivityPoint(
    @Param() params,
    @Body() postActivityPointDto: PostActivityPointDto,
  ): Promise<Class> {
    await this.activityPointsService.add(
      params.studentToClassId,
      postActivityPointDto.points,
    );

    return this.classesService.findOne(params.classId);
  }

  @Post(':classId/studentsPerformance/:studentToClassId/missingHomeworks')
  async addMissingHomework(@Param() params): Promise<Class> {
    await this.missingHomeworksService.add(params.studentToClassId);

    return this.classesService.findOne(params.classId);
  }

  @Post(':classId/studentsPerformance/:studentToClassId/loudnessWarnings')
  async addLoudnessWarning(@Param() params): Promise<Class> {
    await this.loudnessWarningsService.add(params.studentToClassId);

    return this.classesService.findOne(params.classId);
  }
}

export interface PostActivityScoreDto {
  score: number;
}

export interface PostActivityPointDto {
  points: number;
}
