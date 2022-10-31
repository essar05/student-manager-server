import { Class } from './class.entity';
import { Student } from '../students/student.entity';

export interface PostActivityScoreDto {
  score: number;
}

export interface PostActivityPointDto {
  points: number;
}

export interface PostMissingHomeworkDto {
  amount: number;
}

export type PostClassDto = Pick<Class, 'schoolYear' | 'label' | 'schoolId'>;