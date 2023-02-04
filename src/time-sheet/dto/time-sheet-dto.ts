import { IsEmail, ValidateNested, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

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
    public page: number;

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
    public status: STATUS;

}

export enum STATUS {
    DRAFT = 'DRAFT',
    IN_REVIEW = 'IN_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CLOSED = 'CLOSED'
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
}

export class PatchTimeSheetReq {

    @ValidateNested()
    @IsOptional()
    public taskDetail: TaskDetailModel[];

    @IsOptional()
    @IsNumber()
    public engineerId: number;

    @IsOptional()
    @IsNumber()
    public teamLeadId: number;

}
