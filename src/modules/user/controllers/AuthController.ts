import { plainToClass } from 'class-transformer';
import { getRepository, Repository } from 'typeorm';
import {
    JsonController,
    Post,
    Body,
    HttpError,
    Get,
    NotFoundError,
    NotAcceptableError
} from 'routing-controllers';
import { User, UserCreateData, userRoles } from '../models/User';
import { PasswordService } from '../service/PasswordService';

@JsonController('/api/auth')
export class AuthController {
    private repository: Repository<User> = getRepository(User);

    @Post('/reg')
    public async regUser(@Body({required: true}) userCreateData: UserCreateData) {
        if (!userRoles.includes(userCreateData.role)) {
            throw new HttpError(422, `Invalid user role: ${userCreateData.role}`);
        }
        const user = plainToClass(User, userCreateData);
        const sameEmailUserList = await this.repository.find({ where: { email: userCreateData.email }});
        if (sameEmailUserList.length) {
            throw new NotAcceptableError('Invalid auth data!');
        }
        PasswordService.validate(user.password);
        user.password = PasswordService.getHmac(user.password);
        return await this.repository.save(user);
    }

    // @Post('/login')
    // public async login(
    //     @Req() request: Request,
    //     @Body() authData: any
    // ) {

    // }

}