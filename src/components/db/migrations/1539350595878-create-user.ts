import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1539350595878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table user (
                id serial primary key,
                username varchar not null,
                "firstName" varchar,
                "phoneNumber" varchar,
                email varchar,
                role varchar not null,
                password varchar(300) not null
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table user`);
    }

}
