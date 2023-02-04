import { IsEmail, ValidateNested, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

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
  public page: number;
}

export class FilterModel {
  @IsOptional()
  public engineerId: number;

  @IsOptional()
  public engineerName: string;

  @IsOptional()
  public teamLeadId: number;

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
}

export enum STATUS {
    DRAFT = 'DRAFT',
    IN_REVIEW = 'IN_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CLOSED = 'CLOSED'
}
export class TaskDetailModel {
  @IsOptional()
  public id: number;

  public date: string;

  public hourMinute: string;

  public task: string;
}

export class PatchTimeSheetReq {
  @IsOptional()
  public taskDetail: TaskDetailModel[];

  @IsOptional()
  public engineerId: number;

  @IsOptional()
  public teamLeadId: number;
}
