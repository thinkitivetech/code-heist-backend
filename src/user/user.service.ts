import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { HttpError } from 'routing-controllers';
import { paginateResponse } from 'src/utils/common';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/userModel/create-user.dto';
import { User } from './entity/user.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        // @InjectLogger() private logger: NestjsWinstonLoggerService,s

    ) { }

    public async getUsers(req: any): Promise<any[]> {
        try {

            // this.logger.log(`Got request to fetch user by type`)

            let selectQuery = this.userRepository.createQueryBuilder('user');
            if (req) {
                req.name ? selectQuery.andWhere('user.name like (:name)', { name: req.name }) : selectQuery;
                req.mobileNo ? selectQuery.andWhere('user.mobileNo like (:mobileNo)', { name: req.mobileNo }) : selectQuery;
                req.email ? selectQuery.andWhere('user.email like (:email)', { name: req.email }) : selectQuery;
            }
            selectQuery.orderBy('user.createdAt', 'DESC');
            if (req && req.limit && req.page) {
                selectQuery.skip(req.limit * (req.page - 1)).take(req.limit);
            } else {
                req.page = 1;
                req.limit = 10;
            }

            const data = await selectQuery.getManyAndCount();
            console.log(data);
            return paginateResponse(data, req.limit, req.page)
        } catch (err) {
            // this.logger.error(`Error while fetching user for id ${req} Err as ${err}`);
            throw new Error
        }
    }

    public async getUserById(id: number): Promise<any> {
        try {
            // this.logger.log(`Got request to fine one user by id ${id}`);
            return await this.userRepository.findOne({ where: { id: id } });
        } catch (err) {
            // this.logger.error(`Error while fetching user for id ${id} Err as ${err}`);
        }
    }

    async createUser(createUserDto: CreateUserDto, @Res() response: any): Promise<any> {
        // this.logger.log(`Got request to create user ${JSON.stringify(createUserDto)}`);
        const userExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });

        if (userExists) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: `User already exist with emailId ${createUserDto.email}`,
                error_code: HttpStatus.BAD_REQUEST,
                data: {}
            })
        }
        const userDetail = {} as User;
        Object.assign(userDetail, createUserDto)
        userDetail.createdAt = new Date();
        const savedUser = await this.userRepository.save(userDetail);
        savedUser.password = 'xxxx'
        savedUser.hashedPassword = 'xxxx'
        return response.status(HttpStatus.CREATED).json({
            success: true,
            message: 'User has been created successfully',
            data: savedUser,
        });

    }
    async getUserByEmail(email: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (!existingUser) {
            throw new HttpError(HttpStatus.UNAUTHORIZED, `User with emailId ${email} not found`);
        }
        return existingUser;
    }


}
