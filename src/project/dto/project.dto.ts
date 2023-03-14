import { IsOptional } from "class-validator";
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

export class ReqProject {
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
