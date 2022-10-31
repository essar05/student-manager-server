import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentToClass } from '../student-to-class/student-to-class.entity';

@Entity()
export class MissingHomework {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'float', default: 1 })
  public amount: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  public createdAt: Date;

  @Column()
  public studentToClassId!: number;

  @ManyToOne(() => StudentToClass, (stc) => stc.missingHomeworkList, {
    onDelete: 'CASCADE',
  })
  public studentToClass!: StudentToClass[];
}
