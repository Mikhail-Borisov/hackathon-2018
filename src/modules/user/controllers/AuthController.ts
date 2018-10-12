import { plainToClass } from 'class-transformer';
import { getRepository, Repository } from 'typeorm';
import { isAuthorized } from './checkers';
import {
    JsonController,
    Post,
    Body,
    HttpError,
    NotAcceptableError,
    Req,
    ForbiddenError,
    Get,
    UseBefore,
    HttpCode,
    OnUndefined
} from 'routing-controllers';
import { User, UserCreateData, userRoles } from '../models/User';
import { AuthData } from '../models/AuthData';
import { PasswordService } from '../service/PasswordService';


@JsonController('/api/auth')
export class AuthController {
    private repository: Repository<User> = getRepository(User);

    @Post('/reg')
    @HttpCode(201)
    public async regUser(
        @Req() request: Express.Request,
        @Body({ required: true }) userCreateData: UserCreateData
    ): Promise<User> {
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
        await this.repository.save(user);
        
        await new Promise<string>((resolve, reject) => {
            request.logIn(user, (err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    (request.session as Express.Session).save((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve((request.session as Express.Session).id);
                        }
                    });
                }
            });
        });
        return user;
    }

    @Get('/role')
    @UseBefore(isAuthorized)
    public async getRole(
        @Req() request: Express.Request
    ) {
        return {
            role: request.user!.role
        };
    }

    @Post('/login')
    @HttpCode(201)
    public async login(
        @Req() request: Express.Request,
        @Body({ required: true }) authData: AuthData
    ) {
        const user = await this.repository.findOne({ where: { email: authData.email } });
        if (!user) {
            throw new ForbiddenError('Invalid auth data');
        }
        PasswordService.compare(authData.password, user.password);
        await new Promise<string>((resolve, reject) => {
            request.logIn(user, (err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    (request.session as Express.Session).save((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve((request.session as Express.Session).id);
                        }
                    });
                }
            });
        });
        return user;
    }
    
    @Post('/logout')
    @OnUndefined(204)
    public async logout(@Req() request: Express.Request) {
        request.logOut();
    }

}