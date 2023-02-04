import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { createUserDto } from './dto/userModel/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get()
    public async getUsers(): Promise<any[]> {
        const data = this.userService.getUsers(undefined);
        return data;
    }

    @Get('/id')
    public async getUser(
        @Param() id:number
    ): Promise<any> {
        const data = this.userService.getUser(id);
        return data;
    }

    @Post()
    public async createdUser(req: createUserDto): Promise<any> {
        const data = this.userService.createUser(req);
        return data;
    }

}
