import { Student } from './student.entity';

export type InsertStudentDto = Pick<Student, 'firstName' | 'lastName'>;
