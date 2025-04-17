import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationOfLabAndQuestion1744827655560 implements MigrationInterface {
    name = 'AddRelationOfLabAndQuestion1744827655560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "lab_id" integer`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_14c6361d550f3075bee51b25a60" FOREIGN KEY ("lab_id") REFERENCES "labs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_14c6361d550f3075bee51b25a60"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "lab_id"`);
    }

}
