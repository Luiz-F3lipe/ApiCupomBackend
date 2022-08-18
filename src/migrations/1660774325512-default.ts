import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660774325512 implements MigrationInterface {
    name = 'default1660774325512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupons" DROP CONSTRAINT "FK_541e70be595a5839bcd23756257"`);
        await queryRunner.query(`ALTER TABLE "coupons" ADD CONSTRAINT "FK_541e70be595a5839bcd23756257" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupons" DROP CONSTRAINT "FK_541e70be595a5839bcd23756257"`);
        await queryRunner.query(`ALTER TABLE "coupons" ADD CONSTRAINT "FK_541e70be595a5839bcd23756257" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
