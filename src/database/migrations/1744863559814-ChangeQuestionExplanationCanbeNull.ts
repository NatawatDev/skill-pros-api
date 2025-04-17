import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeQuestionExplanationCanbeNull1744863559814 implements MigrationInterface {
    name = 'ChangeQuestionExplanationCanbeNull1744863559814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "choices" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "explanation" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "explanation" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "choices" DROP NOT NULL`);
    }

}
