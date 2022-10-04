import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../students/student.entity";

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  school: string;

  @Column()
  year: number;

  @OneToMany(type => Student, student => student.class)
  students: Student[];
}