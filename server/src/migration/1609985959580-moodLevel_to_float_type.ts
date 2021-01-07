import {MigrationInterface, QueryRunner} from "typeorm"

export class moodLevelToFloatType1609985959580 implements MigrationInterface {
    name = 'moodLevelToFloatType1609985959580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mood" ALTER COLUMN "moodLevel" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mood" ALTER COLUMN "moodLevel" TYPE integer`);
    }

}
