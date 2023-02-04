import { IsEmail, ValidateNested, IsNumber, IsOptional, IsString, IsEnum } from "@nestjs/class-validator";

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

    @IsNumber()
    @IsOptional()
    public limit: number;

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

}
