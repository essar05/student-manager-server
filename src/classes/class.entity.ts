import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { School } from '../schools/school.entity';
import { StudentToClass } from '../student-to-class/student-to-class.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schoolYear: number;

  @Column()
  label: string;

  @ManyToOne((type) => School, (s) => s.classes)
  school: School;

  @OneToMany(() => StudentToClass, (stc) => stc.student)
  students: Student[];

  @OneToMany(() => StudentToClass, (stc) => stc.class)
  studentsPerformance: StudentToClass[];
}
