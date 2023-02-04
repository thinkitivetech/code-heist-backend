import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { IsEnum } from "class-validator";

export enum ORDER {

    ASC = 'ASC',
    DESC = 'DESC',
}

export enum TIME_SHEET_STATUS {
    DRAFT = 'DRAFT',
    IN_REVIEW = 'IN_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CLOSED = 'CLOSED',
    SEND_TO_APPROVAL_BY_TL = 'SEND_TO _APPROVAL_BY_TL',
    SEND_TO_APPROVAL_BY_MANAGER = 'SEND_TO_APPROVAL_BY_MANAGER',
    APPROVED_APPROVAL_BY_TL = 'APPROVED_APPROVAL_BY_TL',
    APPROVED_APPROVAL_BY_MANAGER = 'APPROVED_APPROVAL_BY_MANAGER',
    REJECTED_TO_APPROVAL_BY_TL = 'REJECTED_TO_APPROVAL_BY_TL',
    REJECTED_TO_APPROVAL_BY_MANAGER = 'REJECTED_TO_APPROVAL_BY_MANAGER'

}

export class FilterModel {

    @IsNumber()
    @IsOptional()
    public engineerId: number;

    @IsString()
    @IsOptional()
    public engineerName: string;

    @IsNumber()
    @IsOptional()
    public teamLeadId: number;

    @IsString()
    @IsOptional()
    public teamLeadName: string;

    @IsNumber()
    @IsOptional()
    public mangerId: number;

    @IsString()
    @IsOptional()
    public managerName: string;

    @IsNumber()
    @IsOptional()
    public projectId: number;

    @IsString()
    @IsOptional()
    public projectName: string;

    @IsNumber()
    @IsOptional()
    public salesId: number;

    @IsString()
    @IsOptional()
    public salesName: string;

    @IsNumber()
    @IsOptional()
    public companyId: number;

    @IsOptional()
    public status: TIME_SHEET_STATUS;

    @IsOptional()
    @IsEnum(ORDER)
    public order: ORDER;

}
export class GetTimeSheetReq {


    @IsNumber()
    @IsOptional()
    public engineerId: number;

    @IsNumber()
    @IsOptional()
    public timeSheetId: number;

    @IsString()
    @IsOptional()
    public startTime: string;

    @IsString()
    @IsOptional()
    public endTime: string;

    @IsNumber()
    @IsOptional()
    public projectId: number;

    @IsOptional()
    public filter: FilterModel;

    @IsNumber()
    @IsOptional()
    public limit: number;

    @IsNumber()
    @IsOptional()
    public userId: number;

    @IsNumber()
    @IsOptional()
    public page: number;

}


export class TaskDetailModel {
    @IsNumber()
    @IsOptional()
    public id: number;

    @IsString()
    public date: string;

    @IsString()
    public hourMinute: string;

    @IsString()
    public task: string;

    @IsOptional()
    @IsString()
    public notes: string;

    @IsOptional()
    @IsString()
    public status: string;
}

export class PatchTimeSheetReq {

    @IsOptional()
    public taskDetail: TaskDetailModel[];

    @IsOptional()
    @IsNumber()
    public engineerId: number;

    @IsOptional()
    @IsNumber()
    public teamLeadId: number;

    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    public projectDetail: string;

    @IsString()
    @IsOptional()
    public status: string;

    @IsNumber()
    @IsOptional()
    public assignedTo: number;

    @IsNumber()
    @IsOptional()
    public userId: number;

    @IsString()
    @IsOptional()
    public note: string;

}

export class TimeSheetStatusReq {

    @IsEnum(TIME_SHEET_STATUS)
    @IsOptional()
    public status: TIME_SHEET_STATUS;

    @IsOptional()
    public userId: number;

    @IsOptional()
    public note: string;

    @IsOptional()
    public id: number;
}