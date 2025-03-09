import { Controller, Post, Body, Req, Res, Request, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    async postUser(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body() createUserDto: CreateUserDto
        ){
        return await this.userService.postUser(req, res, createUserDto)
    }

}
