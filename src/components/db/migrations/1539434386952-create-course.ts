import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourse1539434386952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table course (
                id serial primary key,
                "isPublished" boolean not null default true,
                title varchar not null,
                "subTitle" varchar, 
                description text not null,
                "demoVideoUrl" varchar,
                "imageUrl" varchar
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table course`);
    }

}
