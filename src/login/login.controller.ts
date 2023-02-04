import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LoginDetails } from './dto/login-user.dto';
import { LoginService } from './login.service';

@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async login(@Res() response: any, @Body() loginDetails: LoginDetails) {
    try {
      const jwtDetails = await this.loginService.loginUser(loginDetails)
      if (jwtDetails) {
        return response.status(HttpStatus.OK).json({
          success: true,
          message: 'User logged in successfully',
          data: jwtDetails
        });
      } else {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid email or password',
          error_code: HttpStatus.UNAUTHORIZED,
          data: {}
        });
      }
    } catch (err) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Internal server error',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }
}
