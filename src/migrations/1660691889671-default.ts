import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660691889671 implements MigrationInterface {
    name = 'default1660691889671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coupons" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "code" character varying NOT NULL, "discount" integer NOT NULL, "store_id" integer, CONSTRAINT "PK_d7ea8864a0150183770f3e9a8cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coupons" ADD CONSTRAINT "FK_541e70be595a5839bcd23756257" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupons" DROP CONSTRAINT "FK_541e70be595a5839bcd23756257"`);
        await queryRunner.query(`DROP TABLE "stores"`);
        await queryRunner.query(`DROP TABLE "coupons"`);
    }

}
