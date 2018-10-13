import { JsonController, Post } from "routing-controllers";

@JsonController('/api/tag')
export class TagController {

    @Post('/')
    public async getAll() {

    }
}