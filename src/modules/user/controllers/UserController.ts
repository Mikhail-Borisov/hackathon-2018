import {
    JsonController,
    Get
} from 'routing-controllers';

@JsonController('/api/user')
export class UserController {
    @Get('/profile')
    public async getUserProfile() {
        return {
            hello: 'World'
        };
    }
}