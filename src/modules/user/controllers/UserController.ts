import { getRepository, Repository } from 'typeorm';
import { User, UserRole } from '../models/User';
import { isAuthorized } from './checkers';
import {
    JsonController,
    Get,
    Post,
    Req,
    UseBefore,
    NotFoundError,
    Body,
    HttpCode
} from 'routing-controllers';
import { WorkerProfile } from '../models/WorkerProfile';
import { JobStrory } from '../models/JobStory';
import { plainToClass } from 'class-transformer';
import { TagConverter, serviceBaseUrl } from '../service/TagConverter';
import { SkillTag } from '../../../modules/course/models/Tag';

@JsonController('/api/user')
@UseBefore(isAuthorized)
export class UserController {
    private repository: Repository<User> = getRepository(User);
    private tagRepository: Repository<SkillTag> = getRepository(SkillTag);
    private workerRepository: Repository<WorkerProfile> = getRepository(WorkerProfile);
    private tagConverter: TagConverter = new TagConverter(serviceBaseUrl);

    @Get(`/profile/${UserRole.WORKER}`)
    @UseBefore(isAuthorized)
    public async getWorkerProfile(@Req() request: Express.Request) {
        const user = await this.repository.findOne(request.user!.id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const profile = await this.workerRepository.findOne({ 
            where: {
                userId: user.id
            } 
        });
        user.profileData = profile;
        return Object.assign(user, { password: undefined });
    }

    @Post(`/profile/${UserRole.WORKER}`)
    @UseBefore(isAuthorized)
    @HttpCode(201)
    public async createProfile(
        @Req() request: Express.Request,
        @Body() jobStoryList: { list: JobStrory[]; }
    ) {
        const user = await this.repository.findOne(request.user!.id);
        const tags = await this.tagRepository.find();
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const profile = new WorkerProfile(); 
        profile.setUserId(user);
        profile.jobs = plainToClass(JobStrory, jobStoryList.list);
        profile.skillTags = await this.tagConverter.make(profile.jobs, tags);
        await this.workerRepository.save(profile);
        return profile;
    }

    @Get(`/profile/${UserRole.TEACHER}`)
    @UseBefore(isAuthorized)
    public async getTeacherProfile(@Req() request: Express.Request) {
        const user = await this.repository.findOne(request.user.id);
        return Object.assign(user, { password: undefined });
    }

    @Get(`/profile/${UserRole.EMPLOYER}`)
    @UseBefore(isAuthorized)
    public async getEmployerProfile(@Req() request: Express.Request) {
        const user = await this.repository.findOne(request.user.id);
        return Object.assign(user, { password: undefined });
    }
}