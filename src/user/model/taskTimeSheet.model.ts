import { IsOptional } from "class-validator";
import { TimeSheetModel } from "./timeSheet.model";

export class TaskTimeSheetModel {
  @IsOptional()
  public id: number;

  @IsOptional()
  public task: string;

  @IsOptional()
  public minutes: number;

  @IsOptional()
  public notes: string;

  @IsOptional()
  public editedBy: string;

  @IsOptional()
  public profile: string;

  @IsOptional()
  public status: string;

  @IsOptional()
  public createdAt: string;

  @IsOptional()
  public updatedAt: string;

  @IsOptional()
  public timeSheet: TimeSheetModel;
}
