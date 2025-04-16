import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLessonTable1744819832822 implements MigrationInterface {
    name = 'CreateLessonTable1744819832822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lessons_status_enum" AS ENUM('published', 'unpublished')`);
        await queryRunner.query(`CREATE TABLE "lessons" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text, "attachment_path" jsonb, "order" integer NOT NULL DEFAULT '0', "status" "public"."lessons_status_enum" NOT NULL DEFAULT 'published', "created_by" character varying(255) NOT NULL, "updated_by" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lessons"`);
        await queryRunner.query(`DROP TYPE "public"."lessons_status_enum"`);
    }

}
