import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAdminStatusAndRoleToEnum1744813469091 implements MigrationInterface {
    name = 'ChangeAdminStatusAndRoleToEnum1744813469091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."admins_status_enum" AS ENUM('pending', 'active', 'suspend')`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "status" "public"."admins_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."admins_role_enum" AS ENUM('superadmin', 'editor')`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "role" "public"."admins_role_enum" NOT NULL DEFAULT 'editor'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."admins_role_enum"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "role" character varying(20) NOT NULL DEFAULT 'editor'`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."admins_status_enum"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "status" character varying(20) NOT NULL DEFAULT 'pending'`);
    }

}
