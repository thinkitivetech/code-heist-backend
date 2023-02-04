import { HttpStatus, Inject, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { response } from 'passport-strategy/node_modules/@types/express';
import { HttpCode, HttpError } from 'routing-controllers';
import { TimeSheetEntity } from 'src/entities/timesheet.entity';
import { applyPassportStrategy } from 'src/security/JWTMiddleware';
import { UserRoles } from 'src/user/dto/userModel/user-model';
import { UserEntity } from 'src/user/entity/user.entity';
import { paginateResponse } from 'src/utils/common';
import { Brackets, Repository } from 'typeorm';
import { GetTimeSheetReq, PatchTimeSheetReq, Status } from './dto/time-sheet-dto';
import { TimeSheetMapper } from './mapper/time-sheet.mapper';
import * as Bluebird from 'bluebird';
import { TaskSheetEntity } from 'src/entities/taskTimeSheet.entity';
@Injectable()
export class TimeSheetService {

    constructor(
        @InjectRepository(TimeSheetEntity)
        private readonly timeSheetRepo: Repository<TimeSheetEntity>,
        @InjectRepository(TaskSheetEntity)
        private readonly taskSheetRepo: Repository<TaskSheetEntity>,
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        @InjectLogger() private logger: NestjsWinstonLoggerService,
        private readonly timeSheetMapper: TimeSheetMapper,
    ) { }

    public async getTimeSheet(timeSheetRequest: GetTimeSheetReq, @Res() response: any): Promise<any> {
        try {

            this.logger.log(`Got request to fetch time sheet by params ${JSON.stringify(timeSheetRequest)}`)

            let selectQuery = this.timeSheetRepo.createQueryBuilder('timeSheet')
                .leftJoinAndSelect('timeSheet.taskSheet', 'taskDetails');
            if (timeSheetRequest) {
                timeSheetRequest.engineerId ? selectQuery.where('timeSheet.engineer = :engineer', { engineer: timeSheetRequest.engineerId }) : selectQuery;
                timeSheetRequest.projectId ? selectQuery.where('timeSheet.project = :project', { project: timeSheetRequest.projectId }) : selectQuery;
                timeSheetRequest.timeSheetId ? selectQuery.where('timeSheet.id = :id', { id: timeSheetRequest.timeSheetId }) : selectQuery;
            }
            if (timeSheetRequest.startTime) {
                selectQuery.andWhere('timeSheet.createdAt >= :createdAt', { createdAt: timeSheetRequest.startTime })
            }
            if (timeSheetRequest.endTime) {
                selectQuery.andWhere('timeSheet.createdAt <= :createdAt', { createdAt: timeSheetRequest.endTime })
            }
            selectQuery.orderBy('timeSheet.createdAt', 'DESC');
            if (timeSheetRequest && timeSheetRequest.limit && timeSheetRequest.page) {
                selectQuery.skip(timeSheetRequest.limit * (timeSheetRequest.page - 1)).take(timeSheetRequest.limit);
            } else {
                timeSheetRequest.page = 1;
                timeSheetRequest.limit = 10;
            }
            const data = await selectQuery.getManyAndCount();
            const paginatedResponse = paginateResponse(data, timeSheetRequest.limit, timeSheetRequest.page);
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Time sheet fetched successfully',
                data: paginatedResponse,
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'It seems there is some technical glitch at our end, Unable to fetch time-sheet.',
                error_code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: err.message
            });
        }
    }

    public async getAllTimeSheet(timeSheetRequest: GetTimeSheetReq, @Res() response: any): Promise<any[]> {
        try {

            this.logger.log(`Got request to fetch time sheet by params ${JSON.stringify(timeSheetRequest)}`)
//             if(!timeSheetRequest.userId){
//
//             }
//             const loggedInUser:any = applyPassportStrategy();
//             let user;
//             if (loggedInUser && loggedInUser.email) {
//                 user = await this.userRepo.findOne({ where: { email: loggedInUser.email } });
//             }
//             if (!user) {
//                 this.logger.error(`User not found for email ${loggedInUser.email}`);
//                 throw new Error('No User has been found`');
//             }
//
//             if (user.role === UserRoles.TEAM_LEAD) {
//                 timeSheetRequest.filter.teamLeadId = user.id;
//             }
//             if (user.role === UserRoles.MANAGER) {
//                 timeSheetRequest.filter.mangerId = user.id;
//             }
//             if (user.role === UserRoles.ENGINEER) {
//                 timeSheetRequest.filter.engineerId = user.id;
//             }
//             if (user.role === UserRoles.SALES) {
//                 timeSheetRequest.filter.salesId = user.id;
//             }

            let selectQuery = this.timeSheetRepo.createQueryBuilder('timeSheet')
                .leftJoinAndSelect('timeSheet.engineer', 'engineer')
                .leftJoinAndSelect('timeSheet.project', 'project')
                .leftJoinAndSelect('project.sales', 'sales')
                .leftJoinAndSelect('timeSheet.profile', 'profile')
                .leftJoinAndSelect('timeSheet.teamLead', 'teamLead')
                .leftJoinAndSelect('timeSheet.manager', 'manager')

            timeSheetRequest.timeSheetId ? selectQuery.where('timeSheet.id = :id', { id: timeSheetRequest.timeSheetId }) : selectQuery;

            if (timeSheetRequest && timeSheetRequest.filter) {
                timeSheetRequest.filter.engineerId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('timeSheet.engineerId = :engineerId', { engineerId: timeSheetRequest.filter.engineerId })
                        .orWhere('engineer.name like (:engineerName)', { engineerName: '%' + timeSheetRequest.filter.managerName + '%' })
                })) : selectQuery;

                timeSheetRequest.filter.teamLeadId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('timeSheet.teamLeadId = :teamLeadId', { teamLeadId: timeSheetRequest.filter.teamLeadId })
                        .orWhere('teamLead.name like (:teamLeadName)', { teamLeadName: '%' + timeSheetRequest.filter.teamLeadName + '%' })
                })) : selectQuery;

                timeSheetRequest.filter.mangerId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('timeSheet.mangerId = :mangerId', { teamLeadId: timeSheetRequest.filter.mangerId })
                        .orWhere('manager.name like (:managerName)', { managerName: '%' + timeSheetRequest.filter.managerName + '%' })
                })) : selectQuery;


                timeSheetRequest.filter.projectId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.id = :projectId', { projectId: timeSheetRequest.filter.projectId })
                        .orWhere('project.name like (:projectName)', { projectName: '%' + timeSheetRequest.filter.projectName + '%' })
                })) : selectQuery;


                timeSheetRequest.filter.salesId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('sales.id = :salesId', { salesId: timeSheetRequest.filter.salesId })
                        .orWhere('sales.name like (:salesName)', { salesName: '%' + timeSheetRequest.filter.salesName + '%' })
                })) : selectQuery;


                timeSheetRequest.filter.companyId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('sales.companyId = :companyId', { companyId: timeSheetRequest.filter.companyId })
                })) : selectQuery;


                timeSheetRequest.filter.status ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('timeSheet.status = :status', { status: timeSheetRequest.filter.status })
                })) : selectQuery;

            }

            if (timeSheetRequest.startTime) {
                selectQuery.andWhere('timeSheet.createdAt >= :createdAt', { createdAt: timeSheetRequest.startTime })
            }
            if (timeSheetRequest.endTime) {
                selectQuery.andWhere('timeSheet.createdAt <= :createdAt', { createdAt: timeSheetRequest.endTime })
            }
            if (timeSheetRequest && timeSheetRequest.filter.order) {
                if (timeSheetRequest.filter.order === 'DESC') {
                    selectQuery.orderBy('timeSheet.createdAt', 'DESC');
                }
                if (timeSheetRequest.filter.order === 'ASC') {
                    selectQuery.orderBy('timeSheet.createdAt', 'ASC');
                }
            }
            if (timeSheetRequest && timeSheetRequest.limit && timeSheetRequest.page) {
                selectQuery.skip(timeSheetRequest.limit * (timeSheetRequest.page - 1)).take(timeSheetRequest.limit);
            } else {
                timeSheetRequest.page = 1;
                timeSheetRequest.limit = 10;
            }

            const data = await selectQuery.getManyAndCount();
            const paginatedResponse = paginateResponse(data, timeSheetRequest.limit, timeSheetRequest.page);
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'User has been created successfully',
                data: paginatedResponse,
            });
        } catch (err) {
            this.logger.error(`Error while fetching user for id ${timeSheetRequest} Err as ${err}`);
            throw new Error(`error while fetching timeSheet ${err}`);
        }
    }




    public async updateTimeSheet(timeSheetReq: PatchTimeSheetReq, timeSheetId: number, @Res() response: any) {
        const existingTimeSheet = await this.timeSheetRepo.findOne({ where: { id: timeSheetId } });
        if (!existingTimeSheet) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Unable to update time-sheet, as there is no timesheet with provided Id.',
                error_code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: {}
            });
        }
        const userDetails = await this.userRepo.findOne({ where: { id: timeSheetReq.assignedTo } })
        const loggedInUser = applyPassportStrategy();
        let lastEditedBy: any = userDetails?.name;
        if (!(userDetails?.email === loggedInUser.email)) {
            lastEditedBy = await this.userRepo.findOne({ where: { id: timeSheetReq.assignedTo } })
        }
        let taskSheetObject: any[] = []
        lastEditedBy.name = userDetails?.name;
        let timeSheetEntity = this.timeSheetMapper.toUpdateTimeSheetEntity(timeSheetReq, existingTimeSheet, userDetails?.name, lastEditedBy.name);

        if (existingTimeSheet.taskDetails && existingTimeSheet.taskDetails.length) {
            await Bluebird.Promise.each(timeSheetReq.taskDetail, async (taskDetail) => {
                const toTaskDetailEntity = this.timeSheetMapper.toTaskDetailEntity(taskDetail, userDetails?.name, lastEditedBy.name, timeSheetId)
                taskSheetObject.push(toTaskDetailEntity)
            })
        }
        timeSheetEntity.taskDetails = taskSheetObject;
        const updatedTimeSheetEntity = await this.timeSheetRepo.save(timeSheetEntity);
        return response.status(HttpStatus.OK).json({
            success: true,
            message: 'Time sheet has been updated successfully',
            data: updatedTimeSheetEntity,
        });
    }

    public async createTimeSheet(timeSheetReq: PatchTimeSheetReq, @Res() response: any) {
        try {
            const userDetails = await this.userRepo.findOne({ where: { id: timeSheetReq.assignedTo } })
            const loggedInUser = applyPassportStrategy();
            let lastEditedBy: any = userDetails?.name;
            if (!(userDetails?.email === loggedInUser.email)) {
                lastEditedBy = await this.userRepo.findOne({ where: { id: timeSheetReq.assignedTo } })
            }
            lastEditedBy.name = userDetails?.name;
            let timeSheetEntity = this.timeSheetMapper.toTimeSheetEntity(timeSheetReq, userDetails?.name, lastEditedBy.name);
            const timeSheetDetail = await this.timeSheetRepo.save(timeSheetEntity);
            let taskSheetObject: any[] = []
            await Bluebird.Promise.each(timeSheetReq.taskDetail, async (taskDetail) => {
                const totaskDetailEntity = this.timeSheetMapper.toTaskDetailEntity(taskDetail, userDetails?.name, lastEditedBy.name, timeSheetDetail.id)
                const taskSheetEntity = await this.taskSheetRepo.save(totaskDetailEntity);
                taskSheetObject.push(taskSheetEntity)
            }
            );
            timeSheetEntity.taskDetails = taskSheetObject;
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'User has been created successfully',
                data: timeSheetEntity,
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'It seems there is some technical glitch at our end, Unable to create time-sheet.',
                error_code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: err.message
            });
        }

    }


    public async updateStatus(timeSheetReq: Status, @Res() response: any) {
        try {
            const timeSheetId =  timeSheetReq.id;
        const existingTimeSheet = await this.timeSheetRepo.findOne({ where: { id: timeSheetId } });
        if (!existingTimeSheet) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Unable to update time-sheet, as there is no timesheet with provided Id.',
                error_code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: {}
            });
        }
        let userDetails : any;
        let loggedInUser;
        if(timeSheetReq && timeSheetReq.userId){
            userDetails = await this.userRepo.findOne({ where: { id: timeSheetReq.userId } })
        }else {
            loggedInUser = applyPassportStrategy();
        }
        let lastEditedBy: any = userDetails?.name;
        if (!(userDetails?.email === loggedInUser.email)) {
            lastEditedBy = await this.userRepo.findOne({ where: { id: loggedInUser.email } })
        }
        lastEditedBy.name = userDetails?.name;
        const nameData = userDetails && userDetails.name ? userDetails.name : '';
        const updatedTimeSheetEntity = await this.timeSheetRepo.save({id: timeSheetId, status: timeSheetReq.status , name :nameData , note: timeSheetReq.note} as TimeSheetEntity);
        return response.status(HttpStatus.OK).json({
            success: true,
            message: 'Time sheet has been updated successfully',
            data: updatedTimeSheetEntity,
        });
    } catch(err){
        throw new Error(`error while updating status ${err}`);
    }
}

}
