import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { TimeSheetEntity } from 'src/entities/timesheet.entity';
import { Builder } from 'builder-pattern';
import { PatchTimeSheetReq, TaskDetailModel } from '../dto/time-sheet-dto';
import { TaskSheetEntity } from 'src/entities/taskTimeSheet.entity';
import { convertHourstoMinute } from 'src/utils/common';

@Injectable()
export class TimeSheetMapper {

    constructor(

    ) { }
    public toTimeSheetEntity(timeSheetRequest: PatchTimeSheetReq, assignedTo: string, editedBy: string): TimeSheetEntity {
        return Builder(TimeSheetEntity)
            .engineerId(timeSheetRequest.engineerId)
            .assignedTo(assignedTo ? assignedTo : '')
            .name(timeSheetRequest.name)
            .project(timeSheetRequest.project)
            .status(timeSheetRequest.status)
            .taskDetails(timeSheetRequest.taskDetail.map(taskDetail => this.toTaskDetailEntity(taskDetail, editedBy)))
            .createdAt(new Date())
            .updatedAt(new Date())
            .build();
    }

    public toTaskDetailEntity(taskDetail: TaskDetailModel, editedBy: string): TaskSheetEntity {
        return Builder(TaskSheetEntity)
            .minutes(convertHourstoMinute(taskDetail.hourMinute))
            .editedBy(taskDetail.)
            .build()
    }
}
