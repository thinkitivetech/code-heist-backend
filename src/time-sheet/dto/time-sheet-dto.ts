import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { IsEnum } from "class-validator";

export enum ORDER {

    ASC = 'ASC',
    DESC = 'DESC',
}

export enum STATUS {
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

    @IsOptional()
    public engineerId: number;

    @IsOptional()
    public engineerName: string;

    @IsOptional()
    public teamLeadId: number;

    @IsOptional()
    public timeSheetId: number;

    @IsOptional()
    public teamLeadName: string;

    @IsOptional()
    public mangerId: number;

    @IsOptional()
    public managerName: string;

    @IsOptional()
    public projectId: number;

    @IsOptional()
    public projectName: string;

    @IsOptional()
    public salesId: number;

    @IsOptional()
    public salesName: string;

    @IsOptional()
    public companyId: number;

    @IsOptional()
    public status: STATUS;

    @IsOptional()
    @IsEnum(ORDER)
    public order: ORDER;

}
export class GetTimeSheetReq {


    @IsOptional()
    public engineerId: number;

    @IsOptional()
    public timeSheetId: number;

    @IsOptional()
    public startTime: string;

    @IsOptional()
    public endTime: string;

    @IsOptional()
    public projectId: number;

    @IsOptional()
    public filter: FilterModel;

    @IsOptional()
    public limit: number;

    @IsOptional()
    public userId: number;

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

}

export class Status {

    @IsOptional()
    public status: STATUS;

    @IsOptional()
    public userId: number;

    @IsOptional()
    public note: string;

    @IsOptional()
    public id: number;
}