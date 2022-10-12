import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.entity';
import { ActivityScoresService } from '../activity-scores/activity-scores.service';
import { ActivityPointsService } from '../activity-points/activity-points.service';
import { MissingHomeworksService } from '../missing-homeworks/missing-homeworks.service';
import { LoudnessWarningsService } from '../loudness-warnings/loudness-warnings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  PostActivityPointDto,
  PostActivityScoreDto,
  PostClassDto,
} from './classes.dto';
import { InsertStudentDto } from '../students/student.dto';
import { StudentsService } from '../students/students.service';
import { StudentToClassService } from '../student-to-class/student-to-class.service';

@Controller('classes')
export class ClassesController {
  constructor(
    private classesService: ClassesService,
    private studentsService: StudentsService,
    private studentToClassService: StudentToClassService,
    private activityScoresService: ActivityScoresService,
    private activityPointsService: ActivityPointsService,
    private missingHomeworksService: MissingHomeworksService,
    private loudnessWarningsService: LoudnessWarningsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param() params): Promise<Class> {
    return this.classesService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Body() postClassDto: PostClassDto): Promise<Class> | null {
    return await this.classesService.insert(postClassDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<void> {
    return await this.classesService.remove(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':classId/students')
  async insertStudentIntoClass(
    @Param() params,
    @Body() insertStudentDto: InsertStudentDto,
  ): Promise<Class> {
    const student = await this.studentsService.insert(insertStudentDto);

    if (!student) {
      throw new InternalServerErrorException();
    }

    await this.studentToClassService.insert(params.classId, student.id);

    return await this.classesService.findOne(params.classId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':classId/studentsPerformance/:studentToClassId')
  async removeStudentFromClass(@Param() params): Promise<Class> {
    await this.studentToClassService.remove(params.studentToClassId);

    return await this.classesService.findOne(params.classId);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':classId/studentsPerformance/:studentToClassId/activityScores/:id')
  async deleteActivityScore(@Param() params): Promise<Class> {
    await this.activityScoresService.delete(params.studentToClassId, params.id);

    return this.classesService.findOne(params.classId);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post(':classId/studentsPerformance/:studentToClassId/missingHomeworks')
  async addMissingHomework(@Param() params): Promise<Class> {
    await this.missingHomeworksService.add(params.studentToClassId);

    return this.classesService.findOne(params.classId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':classId/studentsPerformance/:studentToClassId/missingHomeworks')
  async deleteMissingHomework(@Param() params): Promise<Class> {
    await this.missingHomeworksService.deleteLast(params.studentToClassId);

    return this.classesService.findOne(params.classId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':classId/studentsPerformance/:studentToClassId/loudnessWarnings')
  async addLoudnessWarning(@Param() params): Promise<Class> {
    await this.loudnessWarningsService.add(params.studentToClassId);

    return this.classesService.findOne(params.classId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':classId/studentsPerformance/:studentToClassId/loudnessWarnings')
  async deleteLoudnessWarning(@Param() params): Promise<Class> {
    await this.loudnessWarningsService.deleteLast(params.studentToClassId);

    return this.classesService.findOne(params.classId);
  }
}
