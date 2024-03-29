import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { TaskSheetEntity } from "../../entities/taskTimeSheet.entity";
import { TimeSheetEntity } from "../../entities/timesheet.entity";
import { convertHourstoMinute } from "../../utils/common";
import { PatchTimeSheetReq, TaskDetailModel } from "../dto/time-sheet-dto";

@Injectable()
export class TimeSheetMapper {
  public toTimeSheetEntity(
    timeSheetRequest: PatchTimeSheetReq,
    assignedTo: any,
    editedBy: any
  ): TimeSheetEntity {
    return Builder(TimeSheetEntity)
      .engineerId(timeSheetRequest.engineerId)
      .teamLeadId(timeSheetRequest.teamLeadId)
      .managerId(timeSheetRequest.managerId)
      .assignedTo(assignedTo ? assignedTo : "")
      .name(timeSheetRequest.name)
      .projectDetail(timeSheetRequest.projectDetail)
      .status(timeSheetRequest.status)
      .note(timeSheetRequest.note)
      .createdAt(new Date())
      .updatedAt(new Date())
      .build();
  }

  public toTaskDetailEntity(
    taskDetail: TaskDetailModel,
    editedBy: any,
    assignedTo: any,
    timeSheetId: number
  ): TaskSheetEntity {
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
      .build();
  }

  public toUpdateTimeSheetEntity(
    timeSheetRequest: PatchTimeSheetReq,
    existingTimeSheet: TimeSheetEntity,
    assignedTo: any,
    editedBy: any
  ): TimeSheetEntity {
    return Builder(TimeSheetEntity)
      .engineerId(
        timeSheetRequest.engineerId
          ? timeSheetRequest.engineerId
          : existingTimeSheet.engineerId
      )
      .assignedTo(assignedTo ? assignedTo : existingTimeSheet.assignedTo)
      .name(
        timeSheetRequest.name ? timeSheetRequest.name : existingTimeSheet.name
      )
      .projectDetail(
        timeSheetRequest.projectDetail
          ? timeSheetRequest.projectDetail
          : existingTimeSheet.projectDetail
      )
      .status(
        timeSheetRequest.status
          ? timeSheetRequest.status
          : existingTimeSheet.status
      )
      .updatedAt(new Date())
      .build();
  }
}
