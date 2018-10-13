import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMaterial1539435849831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table material (
                id serial primary key,
                "lessonId" integer references lesson (id) on delete cascade,
                "orderNumber" integer not null,
                title varchar not null,
                type varchar not null,
                "subTitle" varchar,
                content text not null
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table material`);
    }

}
