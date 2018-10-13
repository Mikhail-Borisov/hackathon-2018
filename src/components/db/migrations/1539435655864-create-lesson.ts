import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLesson1539435655864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table lesson (
                id serial primary key,
                "courseId" integer references course (id) on delete cascade,
                "orderNumber" integer not null,
                title varchar not null,
                "subTitle" varchar ,
                "promoImageUrl" varchar
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table lesson`);
    }

}
