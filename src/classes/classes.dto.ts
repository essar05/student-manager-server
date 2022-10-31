import { Class } from './class.entity';

export interface PostActivityScoreDto {
  score: number;
}

export interface PostActivityPointDto {
  points: number;
}

export interface PostMissingHomeworkDto {
  amount: number;
}

export interface PatchInitialTestScoreDto {
  score: number;
}

export type PostClassDto = Pick<Class, 'schoolYear' | 'label' | 'schoolId'>;