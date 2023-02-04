import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { paginateResponse } from 'src/utils/common';
import { Repository } from 'typeorm';
import { TaskSheetEntity } from '../entity/taskTimeSheet.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskSheetEntity)
        private taskRepository: Repository<TaskSheetEntity>,
        @InjectLogger() private logger: NestjsWinstonLoggerService,

    ) { }

    public async getTasks(req: any, @Res() response: any): Promise<any[]> {
        try {

            this.logger.log(`Got request to fetch user by type`)

            let selectQuery = this.taskRepository.createQueryBuilder('task');
            if (req) {
                req.id ? selectQuery.andWhere('task.name like (:name)', { name: req.name }) : selectQuery;
            }
            selectQuery.orderBy('task.createdAt', 'DESC');
            if (req && req.limit && req.page) {
                selectQuery.skip(req.limit * (req.page - 1)).take(req.limit);
            } else {
                req.page = 1;
                req.limit = 10;
            }

            const data = await selectQuery.getManyAndCount();
            const paginatedResponse = paginateResponse(data, req.limit, req.page);
            return response.status(HttpStatus.CREATED).json({
                success: true,
                message: 'User has been created successfully',
                data: paginatedResponse,
            });
        } catch (err) {
            this.logger.error(`Error while fetching user for id ${req} Err as ${err}`);
            throw new Error
        }
    }

    // public async getUserById(id: number, @Res() response: any): Promise<any> {
    //     try {
    //         this.logger.log(`Got request to find by id ${id}`);
    //         const userDetail = await this.userRepository.findOne({ where: { id: id } });
    //         return response.status(HttpStatus.CREATED).json({
    //             success: true,
    //             message: 'User fetched successfully',
    //             data: userDetail,
    //         });
    //     } catch (err) {
    //         this.logger.error(`Error while fetching user for id ${id} Err as ${err}`);
    //         return response.status(HttpStatus.BAD_REQUEST).json({
    //             success: false,
    //             message: `User already exist with emailId ${id}`,
    //             error_code: HttpStatus.BAD_REQUEST,
    //             data: {}
    //         })
    //     }
    // }
}
