import { DataSource } from 'typeorm';
import { MissingHomework } from './missing-homeworks/missing-homework.entity';
import { Class } from './classes/class.entity';
import { StudentToClass } from './student-to-class/student-to-class.entity';
import { ActivityScore } from './activity-scores/activity-score.entity';
import { ActivityPoint } from './activity-points/activity-point.entity';
import { Student } from './students/student.entity';
import { User } from './users/user.entity';
import { LoudnessWarning } from './loudness-warnings/loudness-warning.entity';
import { School } from './schools/school.entity';
import { config } from 'dotenv';
import { migrations1667219000298 } from '../migrations/1667219000298-migrations';
import { migrations1667249605020 } from '../migrations/1667249605020-migrations';

config();

export default new DataSource({
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Class,
    MissingHomework,
    StudentToClass,
    ActivityScore,
    ActivityPoint,
    Student,
    User,
    LoudnessWarning,
    School,
  ],
  timezone: 'Z',
  charset: 'utf8mb4_unicode_ci',
  migrations: [migrations1667219000298, migrations1667249605020],
});
