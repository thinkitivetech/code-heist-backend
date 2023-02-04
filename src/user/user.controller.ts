import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { SignUpInterceptor } from 'src/security/SignUpInterceptor';
import { CreateUserDto, UserRequestDto } from './dto/userModel/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getUsers(
    @Query() req: UserRequestDto,
    @Res() response: any) {
    try {
      this.userService.getUsers(req, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to fetch user list.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/id')
  public async getUser(
    @Param() id: number,
    @Res() response: any
  ) {
    try {
      this.userService.getUserById(id, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to fetch user Id.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }
  @Post()
  @UseInterceptors(SignUpInterceptor)
  async createUser(@Res() response: any, @Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.createUser(createUserDto, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to create user.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }

}
