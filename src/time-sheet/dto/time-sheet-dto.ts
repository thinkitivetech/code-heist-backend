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
