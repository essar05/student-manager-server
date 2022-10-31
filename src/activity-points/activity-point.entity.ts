import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentToClass } from '../student-to-class/student-to-class.entity';

@Entity()
export class ActivityPoint {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public points: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  public createdAt: Date;

  @Column()
  public studentToClassId!: number;

  @ManyToOne(() => StudentToClass, (stc) => stc.activityPointList, {
    onDelete: 'CASCADE',
  })
  public studentToClass!: StudentToClass[];
}
