import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { response } from 'passport-strategy/node_modules/@types/express';
import { TimeSheetEntity } from 'src/entities/timesheet.entity';
import { paginateResponse } from 'src/utils/common';
import { Repository } from 'typeorm';
import { GetTimeSheetReq, PatchTimeSheetReq } from './dto/time-sheet-dto';
import { TimeSheetMapper } from './mapper/time-sheet.mapper';

@Injectable()
export class TimeSheetService {

    constructor(
        @InjectRepository(TimeSheetEntity)
        private timeSheetRepo: Repository<TimeSheetEntity>,
        @InjectLogger() private logger: NestjsWinstonLoggerService,
        private timeSheetMapper: TimeSheetMapper,
    ) { }

    public async getTimeSheet(timeSheetRequest: GetTimeSheetReq, @Res() response: any): Promise<any[]> {
        try {

            this.logger.log(`Got request to fetch time sheet by params ${JSON.stringify(timeSheetRequest)}`)

            let selectQuery = this.timeSheetRepo.createQueryBuilder('timeSheet')
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
                message: 'User has been created successfully',
                data: paginatedResponse,
            });
        } catch (err) {
            this.logger.error(`Error while fetching user for id ${timeSheetRequest} Err as ${err}`);
            throw new Error
        }
    }

    public async updateTimeSheet(timeSheetReq: PatchTimeSheetReq, @Res() response: any) {

    }

    public async createTimeSheet(timeSheetReq: PatchTimeSheetReq, @Res() response: any) {
        const timeSheetEntity = this.timeSheetMapper.toTimeSheetEntity(timeSheetReq);

    }

}
