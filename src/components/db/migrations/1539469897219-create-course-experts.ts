import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseExpert1539469897219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table course_experts_auth_user (
                "authUserId" int references auth_user (id) on update cascade on delete cascade,
                "courseId" int references course (id) on update cascade on delete cascade,
                constraint course_expert_pkey primary key ("authUserId", "courseId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table course_experts_auth_user`);
    }

}
