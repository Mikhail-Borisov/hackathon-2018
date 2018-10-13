import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSkillTag1539458595164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table skill_tag (
                id serial primary key,
                title varchar not null unique,
                "imageUrl" varchar
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table skill_tag`);
    }

}
