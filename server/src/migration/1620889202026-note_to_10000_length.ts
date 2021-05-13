import {MigrationInterface, QueryRunner} from "typeorm"

export class noteTo10000Length1620889202026 implements MigrationInterface {
    name = 'noteTo10000Length1620889202026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mood" ALTER COLUMN "note" TYPE varchar(10000)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mood" ALTER COLUMN "note" TYPE varchar(2500)`)
    }

}
