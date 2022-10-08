import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from '../classes/class.entity';
import { StudentToClass } from '../student-to-class/student-to-class.entity';

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
