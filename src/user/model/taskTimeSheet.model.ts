import { IsNumber, IsOptional, IsString } from "class-validator";
import { TimeSheetModel } from "./timeSheet.model";

export class TaskTimeSheetModel {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsString()
  @IsOptional()
  public task: string;

  @IsString()
  @IsOptional()
  public minutes: number;

  @IsString()
  @IsOptional()
  public notes: string;

  @IsString()
  @IsOptional()
  public editedBy: string;

  @IsString()
  @IsOptional()
  public profile: string;

  @IsString()
  @IsOptional()
  public status: string;

  @IsString()
  @IsOptional()
  public createdAt: string;

  @IsString()
  @IsOptional()
  public updatedAt: string;

  @IsString()
  @IsOptional()
  public timeSheet: TimeSheetModel;
}
