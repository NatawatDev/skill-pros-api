import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminAndLab1744707813824 implements MigrationInterface {
    name = 'AddAdminAndLab1744707813824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "firstname" character varying(150) NOT NULL, "lastname" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(20) NOT NULL, "password" character varying(150) NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'pending', "role" character varying(20) NOT NULL DEFAULT 'editor', "invite_token" character varying(255), "reset_password_token" character varying(255), "refresh_token" character varying(255), "invited_at" TIMESTAMP, "last_login_at" TIMESTAMP, "invited_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labs" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "attachment_path" character varying, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_6b9d28c1591cef294c224ce31aa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "labs"`);
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
