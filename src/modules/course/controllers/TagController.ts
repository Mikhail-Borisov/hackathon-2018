import { getRepository, Repository } from 'typeorm';
import { JsonController, Post, Get, Body, HttpCode } from 'routing-controllers';
import { SkillTag, categories } from '../models/Tag';
import { plainToClass } from 'class-transformer';


@JsonController('/api/tag')
export class TagController {
    private repository: Repository<SkillTag> = getRepository(SkillTag);

    @Get('/skills')
    public async getAll() {
        const tags = await this.repository.find();
        return {
            list: tags
        };
    }

    @Get('/category')
    public getAllCategories() {
        return {
            list: categories
        };
    }

    @Post('/skills')
    @HttpCode(201)
    public async create(@Body() createData: { title: string; imageUrl?: string; }) {
        const skillTag = plainToClass(SkillTag, createData);
        await this.repository.save(skillTag);
        return skillTag;
    }   
}