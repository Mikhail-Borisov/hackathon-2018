import { getRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import {
    JsonController,
    Get
} from 'routing-controllers';

@JsonController('/api/user')
export class UserController {
    private repository: Repository<User> = getRepository(User);

    @Get('/profile')
    public async getUserProfile() {
        return await this.repository.find();
    }
}