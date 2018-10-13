import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSkillsCourse1539462407671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table course_skill_tags_skill_tag (
                "skillTagId" int references skill_tag (id) on update cascade on delete cascade,
                "courseId" int references course (id) on update cascade on delete cascade,
                constraint course_skill_pkey primary key ("skillTagId", "courseId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table course_skill_tags_skill_tag`);
    }

}
