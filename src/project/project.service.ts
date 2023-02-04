import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { ProjectEntity } from 'src/entities/project.entity';
import { TaskSheetEntity } from 'src/entities/taskTimeSheet.entity';
import { paginateResponse } from 'src/utils/common';
import { Repository } from 'typeorm';

export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectLogger() private logger: NestjsWinstonLoggerService,

    ) { }

    public async getProjects(req: any, @Res() response: any): Promise<any[]> {
        try {

            this.logger.log(`Got request to fetch project details`)

            let selectQuery = this.projectRepository.createQueryBuilder('project');
            if (req) {
                req.id ? selectQuery.andWhere('project.id = (:id)', { id: req.id }) : selectQuery;
            }
            // selectQuery.orderBy('project.createdAt', 'DESC');
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


    // public async getTaskById(id: number, @Res() response: any): Promise<any> {
    //     try {
    //         this.logger.log(`Got request to find by id ${id}`);
    //         const taskDetail = await this.taskRepository.findOne({ where: { id: id } });
    //         return response.status(HttpStatus.CREATED).json({
    //             success: true,
    //             message: 'User fetched successfully',
    //             data: taskDetail,
    //         });
    //     } catch (err) {
    //         this.logger.error(`Error while fetching user for id ${id} Err as ${err}`);
    //         return response.status(HttpStatus.BAD_REQUEST).json({
    //             success: false,
    //             error_code: HttpStatus.BAD_REQUEST,
    //             data: {}
    //         })
    //     }
    // }


}