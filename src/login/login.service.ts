import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDetails } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'
import { HttpError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class LoginService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        private userService: UserService
    ){}

    async loginUser(loginDetails: LoginDetails): Promise<string> {
        const userDetails = await this.getUser(loginDetails.emailId);

        const match = await bcrypt.compare(loginDetails.password, userDetails.hashedPassword)
        loginDetails.userRole = userDetails.role
        loginDetails.password = '';
        if (!match) {
            return '';
        } else {
            const token = `Bearer ${jwt.sign(loginDetails, process.env.JWT_SECRET_KEY, { expiresIn: 300 })}`
            return token
        }
    }
    async getUser(emailId: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ emailId }).exec();
        if (!existingUser) {
            throw new HttpError(HttpStatus.UNAUTHORIZED, `User with emailId ${emailId} not found`);
        }
        return existingUser;
    }

}
