import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorker1539474019859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table worker_profile (
                id serial primary key,
                "userId" integer references auth_user (id) on delete cascade,
                jobs json not null default '{}'
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table worker_profile`);
    }

}
