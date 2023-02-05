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
    public toTimeSheetEntity(timeSheetRequest: PatchTimeSheetReq, assignedTo: any, editedBy: any): TimeSheetEntity {
        return Builder(TimeSheetEntity)
            .engineerId(timeSheetRequest.engineerId)
            .assignedTo(assignedTo ? assignedTo : '')
            .name(timeSheetRequest.name)
            .projectDetail(timeSheetRequest.projectDetail)
            .status(timeSheetRequest.status)
            .createdAt(new Date())
            .updatedAt(new Date())
            .build();
    }

    public toTaskDetailEntity(taskDetail: TaskDetailModel, editedBy: any, assignedTo: any, timeSheetId: number,): TaskSheetEntity {
        return Builder(TaskSheetEntity)
            .minutes(convertHourstoMinute(taskDetail.hourMinute))
            .editedBy(editedBy)
            .notes(taskDetail.notes)
            .profile(assignedTo)
            .createdAt(new Date())
            .updatedAt(new Date())
            .status(taskDetail.status)
            .task(taskDetail.task)
            .timeSheetId(timeSheetId)
            .build()
    }

    public toUpdateTimeSheetEntity(timeSheetRequest: PatchTimeSheetReq, existingTimeSheet: TimeSheetEntity, assignedTo: any, editedBy: any): TimeSheetEntity {
        return Builder(TimeSheetEntity)
            .engineerId(timeSheetRequest.engineerId ? timeSheetRequest.engineerId : existingTimeSheet.engineerId)
            .assignedTo(assignedTo ? assignedTo : existingTimeSheet.assignedTo)
            .name(timeSheetRequest.name ? timeSheetRequest.name : existingTimeSheet.name)
            .projectDetail(timeSheetRequest.projectDetail ? timeSheetRequest.projectDetail : existingTimeSheet.projectDetail)
            .status(timeSheetRequest.status ? timeSheetRequest.status : existingTimeSheet.status)
            .updatedAt(new Date())
            .build();
    }

}
