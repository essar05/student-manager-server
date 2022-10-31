import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1667219000298 implements MigrationInterface {
  name = 'migrations1667219000298';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`missing_homework\` ADD \`amount\` float NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`missing_homework\` DROP COLUMN \`amount\``,
    );
  }
}
