
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkerSkills1539474698373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table worker_profile_skill_tags_skill_tag (
                "skillTagId" int references skill_tag (id) on update cascade on delete cascade,
                "workerProfileId" int references worker_profile (id) on update cascade on delete cascade,
                constraint worker_skills_pkey primary key ("skillTagId", "workerProfileId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table worker_profile_skill_tags_skill_tag`);
    }

}
