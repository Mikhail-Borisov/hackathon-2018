import { JsonController, Get, Post, Put, Delete, OnUndefined } from 'routing-controllers';

@JsonController('/api/course')
export class CourseController {
    @Get('/')
    public async getAll() {
        return [];
    }    

    @Get('/:id(\\d+)')
    public async getById() {
        return {};
    }
    
    @Post('/')
    public async create() {
        return {};
    }

    @Put('/')
    public async update() {
        return {};
    }

    @Delete('/:id(\\d+)')
    @OnUndefined(204)
    public async delete() {
        return {};
    }
}