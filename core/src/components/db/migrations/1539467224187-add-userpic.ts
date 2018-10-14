
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPic1539467224187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            alter table auth_user
                add "userpicUrl" varchar;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            alter table course
                drop column "userpicUrl"
        `);
    }

}