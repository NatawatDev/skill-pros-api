import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToLabs1744813090654 implements MigrationInterface {
    name = 'AddStatusToLabs1744813090654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."labs_status_enum" AS ENUM('published', 'unpublished')`);
        await queryRunner.query(`ALTER TABLE "labs" ADD "status" "public"."labs_status_enum" NOT NULL DEFAULT 'published'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labs" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."labs_status_enum"`);
    }

}
