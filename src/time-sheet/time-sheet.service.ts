import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bluebird from 'bluebird';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { TaskSheetEntity } from '../entities/taskTimeSheet.entity';
import { TimeSheetEntity } from '../entities/timesheet.entity';
import { UserEntity } from '../user/entity/user.entity';
import { paginateResponse } from '../utils/common';
import { Repository } from 'typeorm';
import { GetTimeSheetReq, PatchTimeSheetReq, TimeSheetStatusReq } from './dto/time-sheet-dto';
import { TimeSheetMapper } from './mapper/time-sheet.mapper';
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
                .leftJoinAndSelect('timeSheet.taskDetails', 'taskDetails');
            if (timeSheetRequest) {
                if(timeSheetRequest.engineerId) {
                    selectQuery.where('timeSheet.engineer = :engineer', { engineer: timeSheetRequest.engineerId });
                }
                if(timeSheetRequest.projectId) {
                    selectQuery.where('timeSheet.project = :project', { project: timeSheetRequest.projectId });
                }
                if(timeSheetRequest.timeSheetId) {
                    selectQuery.where('timeSheet.id = :id', { id: timeSheetRequest.timeSheetId })
                }
            }
            if (timeSheetRequest.startTime) {
                selectQuery.andWhere('timeSheet.createdAt >= :createdAt', { createdAt: timeSheetRequest.startTime })
            }
            if (timeSheetRequest.endTime) {
                selectQuery.andWhere('timeSheet.createdAt <= :createdAt', { createdAt: timeSheetRequest.endTime })
            } 
            if (timeSheetRequest.timeSheetId) {
                selectQuery.andWhere('timeSheet.id >= :id', { id: timeSheetRequest.timeSheetId })
            }
            selectQuery.orderBy('timeSheet.createdAt', 'DESC');
            if (timeSheetRequest && timeSheetRequest.limit && timeSheetRequest.page) {
                selectQuery.skip(timeSheetRequest.limit * (timeSheetRequest.page - 1)).take(timeSheetRequest.limit);
            } else {
                timeSheetRequest.page = 1;
                timeSheetRequest.limit = 10;
            }
            let data: any = await selectQuery.getManyAndCount();
            let startDate = 10;
            data[0].map((timeSheet: any) => {
                if (timeSheet.taskDetails.length) {
                    timeSheet.taskDetails[0].taskDate = `2023-01-${startDate}`;
                }
                startDate++;
            })

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
            this.logger.log(`Got request to fetch time sheet by params ${JSON.stringify(timeSheetRequest)}`);
    
            const selectQuery = this.timeSheetRepo.createQueryBuilder('timeSheet')
                .leftJoinAndSelect('timeSheet.engineer', 'engineer')
                .leftJoinAndSelect('timeSheet.project', 'project')
                .leftJoinAndSelect('project.sales', 'sales')
                .leftJoinAndSelect('timeSheet.profile', 'profile')
                .leftJoinAndSelect('timeSheet.teamLead', 'teamLead')
                .leftJoinAndSelect('timeSheet.manager', 'manager')
                .where(timeSheetRequest.timeSheetId ? { id: timeSheetRequest.timeSheetId } : {});
    
            if (timeSheetRequest.filter) {
                const filter = timeSheetRequest.filter;
    
                if (filter.engineerId) selectQuery.andWhere('timeSheet.engineerId = :engineerId', { engineerId: filter.engineerId });
                if (filter.teamLeadId) selectQuery.andWhere('timeSheet.teamLeadId = :teamLeadId', { teamLeadId: filter.teamLeadId });
                if (filter.mangerId) selectQuery.andWhere('timeSheet.mangerId = :mangerId', { teamLeadId: filter.mangerId });
                if (filter.projectId) selectQuery.andWhere('project.id = :projectId', { projectId: filter.projectId });
                if (filter.salesId) selectQuery.andWhere('sales.id = :salesId', { salesId: filter.salesId });
                if (filter.companyId) selectQuery.andWhere('sales.companyId = :companyId', { companyId: filter.companyId });
                if (filter.status) selectQuery.andWhere('timeSheet.status = :status', { status: filter.status });
            }
    
            if (timeSheetRequest.startTime) selectQuery.andWhere('timeSheet.createdAt >= :createdAt', { createdAt: timeSheetRequest.startTime });
            if (timeSheetRequest.endTime) selectQuery.andWhere('timeSheet.createdAt <= :createdAt', { createdAt: timeSheetRequest.endTime });
    
            const { page = 1, limit = 10 } = timeSheetRequest;
            selectQuery.skip(limit * (page - 1)).take(limit);
    
            const [timeSheets, totalCount] = await selectQuery.getManyAndCount();
            const paginatedResponse = paginateResponse(timeSheets, limit, page);
    
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Time sheets fetched successfully',
                data: paginatedResponse,
                totalCount
            });
        } catch (err) {
            this.logger.error(`Error while fetching time sheet for request ${JSON.stringify(timeSheetRequest)} Err as ${err}`);
            throw new Error(`Error while fetching time sheet ${err}`);
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
        let lastEditedBy: any = userDetails?.name;

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
            const assignedUser = await this.userRepo.findOne({ where: { id: timeSheetReq.assignedTo } })
            const loggedInUser = await this.userRepo.findOne({ where: { id: timeSheetReq.userId } })

            let timeSheetEntity = this.timeSheetMapper.toTimeSheetEntity(timeSheetReq, assignedUser?.name, loggedInUser?.name);
            const timeSheetDetail = await this.timeSheetRepo.save(timeSheetEntity);
            let taskSheetObject: any[] = []
            await Bluebird.Promise.each(timeSheetReq.taskDetail, async (taskDetail) => {
                const totaskDetailEntity = this.timeSheetMapper.toTaskDetailEntity(taskDetail, loggedInUser?.name, assignedUser?.name, timeSheetDetail.id)
                const taskSheetEntity = await this.taskSheetRepo.save(totaskDetailEntity);
                taskSheetObject.push(taskSheetEntity)
            }
            );
            timeSheetEntity.taskDetails = taskSheetObject;
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Time sheet has been created successfully',
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

    public async updateStatus(timeSheetReq: TimeSheetStatusReq, @Res() response: any) {
        try {
            const existingTimeSheet = await this.timeSheetRepo.findOne({ where: { id: timeSheetReq.timeSheetId } });
            if (!existingTimeSheet) {
                return response.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'Unable to update time-sheet, as there is no timesheet with provided Id.',
                    error_code: HttpStatus.BAD_REQUEST,
                    data: {}
                });
            }
            const updateTimeSheetStatus = {} as TimeSheetEntity;
            updateTimeSheetStatus.id = timeSheetReq.timeSheetId;
            updateTimeSheetStatus.status = timeSheetReq.status;
            updateTimeSheetStatus.note = timeSheetReq.note;
            const updatedTimeSheetEntity = await this.timeSheetRepo.save(updateTimeSheetStatus);
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Time sheet has been updated successfully',
                data: updatedTimeSheetEntity,
            });
        } catch (err) {
            throw new Error(`error while updating status ${err}`);
        }
    }

}
