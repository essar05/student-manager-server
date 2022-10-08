import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentToClass } from '../student-to-class/student-to-class.entity';

@Entity()
export class ActivityScore {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column()
  public studentToClassId!: number;

  @ManyToOne(() => StudentToClass, (stc) => stc.activityScores)
  public studentToClass!: StudentToClass;
}