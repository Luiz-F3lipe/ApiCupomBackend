import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660834350264 implements MigrationInterface {
    name = 'default1660834350264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupons" DROP CONSTRAINT "FK_541e70be595a5839bcd23756257"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coupon_user" ("coupon_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_18f164efbba8a5cf4bc8891ea9d" PRIMARY KEY ("coupon_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_01f2fdafe0f71be8d20b832aca" ON "coupon_user" ("coupon_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd4f572ccc55925ce8039d96ba" ON "coupon_user" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "coupons" ADD CONSTRAINT "FK_541e70be595a5839bcd23756257" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon_user" ADD CONSTRAINT "FK_01f2fdafe0f71be8d20b832acac" FOREIGN KEY ("coupon_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coupon_user" ADD CONSTRAINT "FK_dd4f572ccc55925ce8039d96ba4" FOREIGN KEY ("user_id") REFERENCES "coupons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon_user" DROP CONSTRAINT "FK_dd4f572ccc55925ce8039d96ba4"`);
        await queryRunner.query(`ALTER TABLE "coupon_user" DROP CONSTRAINT "FK_01f2fdafe0f71be8d20b832acac"`);
        await queryRunner.query(`ALTER TABLE "coupons" DROP CONSTRAINT "FK_541e70be595a5839bcd23756257"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd4f572ccc55925ce8039d96ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01f2fdafe0f71be8d20b832aca"`);
        await queryRunner.query(`DROP TABLE "coupon_user"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "coupons" ADD CONSTRAINT "FK_541e70be595a5839bcd23756257" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
