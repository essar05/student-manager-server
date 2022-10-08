import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from '../classes/class.entity';
import { StudentToClass } from '../student-to-class/student-to-class.entity';
import { ActivityScore } from '../activity-scores/activity-score.entity';
import { ActivityPoint } from '../activity-points/activity-point.entity';
import { LoudnessWarning } from '../loudness-warnings/loudness-warning.entity';
import { MissingHomework } from '../missing-homeworks/missing-homework.entity';
import { VirtualColumn } from '../decorators';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => StudentToClass, (stc) => stc.student)
  classes: Class[];

  @OneToMany(() => StudentToClass, (stc) => stc.student)
  studentsInClass: StudentToClass[];
}
