import { HttpStatus, Inject, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { response } from 'passport-strategy/node_modules/@types/express';
import { TimeSheetEntity } from 'src/entities/timesheet.entity';
import { applyPassportStrategy } from 'src/security/JWTMiddleware';
import { UserEntity } from 'src/user/entity/user.entity';
import { paginateResponse } from 'src/utils/common';
import { Repository } from 'typeorm';
import { GetTimeSheetReq, PatchTimeSheetReq } from './dto/time-sheet-dto';
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

        if (existingTimeSheet.taskSheet && existingTimeSheet.taskSheet.length) {
            await Bluebird.Promise.each(timeSheetReq.taskDetail, async (taskDetail) => {
                const toTaskDetailEntity = this.timeSheetMapper.toTaskDetailEntity(taskDetail, userDetails?.name, lastEditedBy.name, timeSheetId)
                taskSheetObject.push(toTaskDetailEntity)
            })
        }
        timeSheetEntity.taskSheet = taskSheetObject;
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
            timeSheetEntity.taskSheet = taskSheetObject;
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

}
