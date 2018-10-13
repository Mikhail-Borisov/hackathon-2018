import '../../bootstrap';
import { initDbContainer } from '../../components/ioc/initDbContainer';
import { getRepository } from 'typeorm';
import { SkillTag } from '../../modules/course/models/Tag';
import { plainToClass } from 'class-transformer';
const data: SkillTag[] = require('../../../fixtures/skillTags');

void initDbContainer().then(async() => {
    const repository = getRepository(SkillTag);
    const skills = plainToClass(SkillTag, data);
    await repository.save(skills);
});