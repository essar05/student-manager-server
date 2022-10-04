import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "../classes/class.entity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: null })
  classId: number;

  @ManyToOne(type => Class, c => c.students)
  class: Class;
}