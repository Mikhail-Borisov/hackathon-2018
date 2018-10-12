import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1539350595878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table auth_user (
                id serial primary key,
                email varchar not null,
                "firstname" varchar,
                "lastname" varchar,
                "phoneNumber" varchar,
                role varchar not null,
                password varchar(300) not null
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table auth_user`);
    }

}
