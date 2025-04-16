import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminPasswordCanBeNull1744790621571 implements MigrationInterface {
    name = 'AdminPasswordCanBeNull1744790621571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "password" SET NOT NULL`);
    }

}
