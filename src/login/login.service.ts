import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDetails, LoginResponse } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'
import { HttpError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken'
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService
    ) { }

    async loginUser(loginDetails: LoginDetails): Promise<string> {
        const userDetails = await this.userService.getUserByEmail(loginDetails.email);
        const jwtSecretKey = String(process.env.JWT_SECRET_KEY)
        const match = await bcrypt.compare(loginDetails.password, userDetails.hashedPassword)
        let loginResponse = {} as LoginResponse;
        loginResponse.userRole = userDetails.role
        loginResponse.email = loginDetails.email
        if (!match) {
            return '';
        } else {
            const token = `Bearer ${jwt.sign(loginResponse, jwtSecretKey, { expiresIn: 300 })}`
            return token
        }
    }

}
