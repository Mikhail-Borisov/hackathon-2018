import { JsonController, Get, Post, Put, Delete, OnUndefined, UseBefore, UseInterceptor, Param, NotFoundError } from 'routing-controllers';
import { getRepository, Repository } from 'typeorm';
import { Course } from '../models/Course';
import { ContentFilter } from './checkers/ContentFilter';
import { isTeacher } from './checkers/isTeacher';
import { CourseView } from '../views/CourseView';

@JsonController('/api/course')
export class CourseController {
    private repository: Repository<Course> = getRepository(Course);

    @Get('/')
    @UseInterceptor(ContentFilter)
    public async getAll() {
        const courses = await this.repository.find();
        return {
            list: courses.map(CourseView.render)
        };
    }    

    @Get('/:id(\\d+)')
    public async getById(@Param('id') id: number) {
        const course = await this.repository.findOne(id);
        if (!course) {
            throw new NotFoundError(`Course with id ${id} not found!`);
        }
        return CourseView.render(course);
    }
    
    @Post('/')
    @UseBefore(isTeacher)
    public async create() {
        return {};
    }

    @Put('/')
    @UseBefore(isTeacher)
    public async update() {
        return {};
    }

    @Delete('/:id(\\d+)')
    @UseBefore(isTeacher)
    @OnUndefined(204)
    public async delete() {
        return {};
    }
}