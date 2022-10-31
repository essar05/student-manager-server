import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentToClass } from '../student-to-class/student-to-class.entity';

@Entity()
export class LoudnessWarning {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  public createdAt: Date;

  @Column()
  public studentToClassId!: number;

  @ManyToOne(() => StudentToClass, (stc) => stc.loudnessWarningList, {
    onDelete: 'CASCADE',
  })
  public studentToClass!: StudentToClass[];
}
