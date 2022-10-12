import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Class } from '../classes/class.entity';
import { ActivityScore } from '../activity-scores/activity-score.entity';
import { ActivityPoint } from '../activity-points/activity-point.entity';
import { LoudnessWarning } from '../loudness-warnings/loudness-warning.entity';
import { MissingHomework } from '../missing-homeworks/missing-homework.entity';

@Entity()
export class StudentToClass {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public studentId!: number;

  @Column()
  public classId!: number;

  @ManyToOne(() => Student, (s) => s.classes, {
    onDelete: 'CASCADE',
  })
  public student!: Student;

  @ManyToOne(() => Class, (c) => c.students, {
    onDelete: 'CASCADE',
  })
  public class!: Class;

  @OneToMany(() => ActivityScore, (aS) => aS.studentToClass)
  public activityScores: ActivityScore[];

  @OneToMany(() => ActivityPoint, (aP) => aP.studentToClass)
  public activityPointList: ActivityPoint[];

  @OneToMany(() => LoudnessWarning, (lW) => lW.studentToClass)
  public loudnessWarningList: LoudnessWarning[];

  @OneToMany(() => MissingHomework, (mH) => mH.studentToClass)
  public missingHomeworkList: MissingHomework[];

  public activityPoints?: number;

  public loudnessWarnings?: number;

  public missingHomeworks?: number;
}
