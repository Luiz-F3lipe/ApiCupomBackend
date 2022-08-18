import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660783840786 implements MigrationInterface {
    name = 'default1660783840786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_coupons_coupons" ("usersEmail" character varying NOT NULL, "couponsId" integer NOT NULL, CONSTRAINT "PK_95523943cbdada141faa884c5fe" PRIMARY KEY ("usersEmail", "couponsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ae2a261364bffacccaa85d4c2" ON "users_coupons_coupons" ("usersEmail") `);
        await queryRunner.query(`CREATE INDEX "IDX_89a9521f0c34d541d23a09bacb" ON "users_coupons_coupons" ("couponsId") `);
        await queryRunner.query(`ALTER TABLE "users_coupons_coupons" ADD CONSTRAINT "FK_8ae2a261364bffacccaa85d4c2e" FOREIGN KEY ("usersEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_coupons_coupons" ADD CONSTRAINT "FK_89a9521f0c34d541d23a09bacbd" FOREIGN KEY ("couponsId") REFERENCES "coupons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_coupons_coupons" DROP CONSTRAINT "FK_89a9521f0c34d541d23a09bacbd"`);
        await queryRunner.query(`ALTER TABLE "users_coupons_coupons" DROP CONSTRAINT "FK_8ae2a261364bffacccaa85d4c2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89a9521f0c34d541d23a09bacb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ae2a261364bffacccaa85d4c2"`);
        await queryRunner.query(`DROP TABLE "users_coupons_coupons"`);
    }

}
