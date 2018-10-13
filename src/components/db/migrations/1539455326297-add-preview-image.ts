
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPreviewImage1539455326297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            alter table course
                add "preivewImage" varchar;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            alter table course
                drop column "preivewImage"
        `);
    }

}