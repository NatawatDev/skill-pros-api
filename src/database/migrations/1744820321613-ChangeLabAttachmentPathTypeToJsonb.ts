import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLabAttachmentPathTypeToJsonb1744820321613 implements MigrationInterface {
    name = 'ChangeLabAttachmentPathTypeToJsonb1744820321613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labs" DROP COLUMN "attachment_path"`);
        await queryRunner.query(`ALTER TABLE "labs" ADD "attachment_path" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labs" DROP COLUMN "attachment_path"`);
        await queryRunner.query(`ALTER TABLE "labs" ADD "attachment_path" character varying`);
    }

}
