import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuestionTable1744827569558 implements MigrationInterface {
    name = 'CreateQuestionTable1744827569558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question_text" character varying(255) NOT NULL, "choices" jsonb, "answer" character varying(255) NOT NULL, "explanation" text NOT NULL, "order" integer NOT NULL DEFAULT '0', "created_by" character varying(255) NOT NULL, "updated_by" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "questions"`);
    }

}
