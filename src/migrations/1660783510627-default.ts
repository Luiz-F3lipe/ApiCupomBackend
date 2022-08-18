import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660783510627 implements MigrationInterface {
    name = 'default1660783510627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
