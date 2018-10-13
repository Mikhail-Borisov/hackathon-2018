import { getRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { isAuthorized } from './checkers';
import {
    JsonController,
    Get,
    Req,
    UseBefore
} from 'routing-controllers';

@JsonController('/api/user')
@UseBefore(isAuthorized)
export class UserController {
    private repository: Repository<User> = getRepository(User);

    @Get('/profile')
    @UseBefore(isAuthorized)
    public async getUserProfile(@Req() request: Express.Request) {
        return await this.repository.findOne(request.user.id);
    }
}