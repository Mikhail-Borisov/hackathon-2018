import { 
    JsonController, 
    Get, 
    Post, 
    Put, 
    Delete, 
    OnUndefined, 
    UseBefore, 
    UseInterceptor, 
    Param, 
    NotFoundError,
    QueryParam,
    Body,
    BadRequestError
} from 'routing-controllers';
import { getRepository, Repository, QueryRunner, getConnection } from 'typeorm';
import { Course } from '../models/Course';
import { ContentFilter } from './checkers/ContentFilter';
import { isTeacher } from './checkers/isTeacher';
import { CourseView } from '../views/CourseView';
import { SkillTag } from '../models/Tag';
import { User, UserRole } from '../../../modules/user/models/User';
import { plainToClass } from 'class-transformer';

@JsonController('/api/course')
export class CourseController {
    private repository: Repository<Course> = getRepository(Course);
    private userRepository: Repository<User> = getRepository(User);
    private rawQueryRunner: QueryRunner = getConnection().createQueryRunner();

    @Get('/')
    @UseInterceptor(ContentFilter)
    public async getAll() {
        const courses = await this.repository.find();
        return {
            list: courses.map(CourseView.render)
        };
    }
    
    @Get('/suggest')
    public async suggest(@QueryParam('search') searchPattern: string) {
        const result = (await this.rawQueryRunner.query(
            `SELECT id, title FROM course ` +
            ` WHERE title ILIKE '%${searchPattern}%' OR ` +
            ` description ILIKE '%${searchPattern}%' OR ` +
            ` "subTitle" ILIKE '%${searchPattern}%' ` +
            ` AND "isPublished" = true`
        ))[0];
        return {
            list: result
        };
    }

    @Put('/:id(\\d+)/tag/update')
    public async editTags(
        @Param('id') id: number,
        @Body({ required: true }) tagList: { list: SkillTag[]; }
    ) {
        const course = await this.repository.findOne(id);
        if (!course) {
            throw new NotFoundError(`Course with id ${id} not found!`);
        }
        const tags = plainToClass(SkillTag, tagList.list);
        course.skillTags = tags;
        await this.repository.save(course);

        return CourseView.render(course);
    }

    @Put('/:id(\\d+)/expert/update')
    public async editExpertList(
        @Param('id') id: number,
        @Body({ required: true }) expertIdList: { list: number[]; }
    ) { 
        const course = await this.repository.findOne(id);
        if (!course) {
            throw new NotFoundError(`Course with id ${id} not found!`);
        }
        const experts = await this.userRepository.findByIds(expertIdList.list);
        if (experts.find(expert => expert.role !== UserRole.TEACHER)) {
            throw new BadRequestError('Invalid user roles');
        }
        course.experts = experts;
        await this.repository.save(course);

        return CourseView.render(course);
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

    // @Post('/:id(\\d+)/start')
    // @HttpCode(201)
    // public async startCourse(@Param('id') id: number) {
        
    // }
}