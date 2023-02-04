import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDetails } from './dto/login-user.dto';
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
        const userDetails = await this.userService.getUserByEmail(loginDetails.emailId);

        const match = await bcrypt.compare(loginDetails.password, userDetails.hashedPassword)
        loginDetails.userRole = userDetails.role
        loginDetails.password = '';
        if (!match) {
            return '';
        } else {
            const token = `Bearer ${jwt.sign(loginDetails, 'heist_util', { expiresIn: 300 })}`
            return token
        }
    }

}
