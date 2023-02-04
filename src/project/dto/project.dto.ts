import { IsNumber, IsOptional, IsString } from "class-validator";
import { ManagerController } from "src/manager/manager.controller";
import { FilterModel } from "src/time-sheet/dto/time-sheet-dto";

export class CreateProject {
  public projectName: string;

  @IsOptional()
  public description: string;

  @IsOptional()
  public clientName: string;

  @IsOptional()
  public startDate: string;

  @IsOptional()
  public endDate: string;
}

export class reqProject {
  @IsOptional()
  public projectId: number;

  @IsOptional()
  public projectName: string;

  @IsOptional()
  public description: string;

  @IsOptional()
  public clientName: string;

  @IsOptional()
  public startDate: string;

  @IsOptional()
  public endDate: string;

  @IsOptional()
  public filter: FilterModel;

  @IsOptional()
  public startTime: string;

  @IsOptional()
  public endTime: string;

  @IsOptional()
  public limit: number;

  @IsOptional()
  public userId: number;

  @IsOptional()
  public page: number;
}