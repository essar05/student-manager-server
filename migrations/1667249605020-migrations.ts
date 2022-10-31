import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1667249605020 implements MigrationInterface {
    name = 'migrations1667249605020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_to_class\` ADD \`initialTestScore\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_to_class\` DROP COLUMN \`initialTestScore\``);
    }

}
