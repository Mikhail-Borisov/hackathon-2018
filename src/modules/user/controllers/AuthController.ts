import {
    JsonController,
    Get,
    Post,
    Req,
    Body
} from 'routing-controllers';

@JsonController('/api/auth')
export class AuthController {
    @Post('/login')
    public async login(
        @Req() request: Request,
        @Body() authData: any
    ) {

    }

}