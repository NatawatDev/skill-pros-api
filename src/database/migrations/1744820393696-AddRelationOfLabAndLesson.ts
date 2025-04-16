import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationOfLabAndLesson1744820393696 implements MigrationInterface {
    name = 'AddRelationOfLabAndLesson1744820393696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" ADD "lab_id" integer`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_9db47cba0729e54d53958579376" FOREIGN KEY ("lab_id") REFERENCES "labs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_9db47cba0729e54d53958579376"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "lab_id"`);
    }

}
