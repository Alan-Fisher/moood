import {MigrationInterface, QueryRunner} from "typeorm";

export class init1606924445772 implements MigrationInterface {
    name = 'init1606924445772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tagCategory" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(300), "isArchived" boolean NOT NULL DEFAULT false, "ownerId" integer, CONSTRAINT "PK_e297b988fb50b909bbc6a629a5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(300), "emoji" character varying(300), "state" character varying NOT NULL DEFAULT 'active', "categoryId" integer, "ownerId" integer, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mood" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP NOT NULL DEFAULT now(), "moodLevel" integer NOT NULL, "feelingIds" integer array, "note" character varying(2500), "isArchived" boolean NOT NULL DEFAULT false, "ownerId" integer, CONSTRAINT "PK_cd069bf46deedf0ef3a7771f44b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mood_tags_tag" ("moodId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_eb8ec461f98999f683d7f927587" PRIMARY KEY ("moodId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b0ca4cb0ef7a3bdc1364aaded" ON "mood_tags_tag" ("moodId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b57f58319074f0d9228e0c1a55" ON "mood_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "tagCategory" ADD CONSTRAINT "FK_7dfae8c12d36405a2068fc1004d" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_60fbdce32f9ca3b5afce15a9c32" FOREIGN KEY ("categoryId") REFERENCES "tagCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_fe8fd04149d94c602f0c578d82e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mood" ADD CONSTRAINT "FK_2ec08c8d32986e249ebe1bd0351" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mood_tags_tag" ADD CONSTRAINT "FK_7b0ca4cb0ef7a3bdc1364aaded1" FOREIGN KEY ("moodId") REFERENCES "mood"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mood_tags_tag" ADD CONSTRAINT "FK_b57f58319074f0d9228e0c1a552" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mood_tags_tag" DROP CONSTRAINT "FK_b57f58319074f0d9228e0c1a552"`);
        await queryRunner.query(`ALTER TABLE "mood_tags_tag" DROP CONSTRAINT "FK_7b0ca4cb0ef7a3bdc1364aaded1"`);
        await queryRunner.query(`ALTER TABLE "mood" DROP CONSTRAINT "FK_2ec08c8d32986e249ebe1bd0351"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_fe8fd04149d94c602f0c578d82e"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_60fbdce32f9ca3b5afce15a9c32"`);
        await queryRunner.query(`ALTER TABLE "tagCategory" DROP CONSTRAINT "FK_7dfae8c12d36405a2068fc1004d"`);
        await queryRunner.query(`DROP INDEX "IDX_b57f58319074f0d9228e0c1a55"`);
        await queryRunner.query(`DROP INDEX "IDX_7b0ca4cb0ef7a3bdc1364aaded"`);
        await queryRunner.query(`DROP TABLE "mood_tags_tag"`);
        await queryRunner.query(`DROP TABLE "mood"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "tagCategory"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
