import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { paginateResponse } from 'src/utils/common';
import { Like, Repository } from 'typeorm';
import { User } from './entity/user.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectLogger() private logger: NestjsWinstonLoggerService,

    ) { }

    public async getUsers(req: any): Promise<any[]> {
        try {

            this.logger.log(`Got request to fetch user by type`)

            let selectQuery = this.userRepository.createQueryBuilder('user');
            if (req) {
                req.name ? selectQuery.andWhere('user.name like (:name)', { name: req.name }) : selectQuery;
                req.mobileNo ? selectQuery.andWhere('user.mobileNo like (:mobileNo)', { name: req.mobileNo }) : selectQuery;
                req.email ? selectQuery.andWhere('user.email like (:email)', { name: req.email }) : selectQuery;
            }
            selectQuery.orderBy('user.createdAt', 'DESC');
            if (req.limit && req.page) {
                selectQuery.skip(req.limit * (req.page - 1)).take(req.limit);
            } else {
                req.page = 1;
                req.limit = 10;
            }
            const data = await selectQuery.getManyAndCount();
            return paginateResponse(data, req.limit, req.page)
        } catch (err) {
            this.logger.error(`Error while fetching user for id ${req} Err as ${err}`);
            throw new Error
        }
    }

    public async getUser(id: number): Promise<any> {
        try {
            this.logger.log(`Got request to fine one user by id ${id}`);
            return await this.userRepository.findOne({ where: { id: id } });
        } catch (err) {
            this.logger.error(`Error while fetching user for id ${id} Err as ${err}`);
        }
    }

    public async createUser(user: any): Promise<void> {
        try {
            this.logger.log(`Got request to create user ${JSON.stringify(user)}`);
            await this.userRepository.save(user);
        } catch (err) {
            this.logger.error(`Error while creating user ${JSON.stringify(user)} Err as ${err}`);
        }
    }

}
