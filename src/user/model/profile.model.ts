import { IsNumber, IsOptional, IsString } from "class-validator";
import { EngineeringModel } from "./engineering.model";
import { ProjectModel } from "./project.model";
import { TimeSheetModel } from "./timeSheet.model";

export class ProfileModel {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public mobileNo: string;

  @IsString()
  @IsOptional()
  public mail: string;

  @IsString()
  @IsOptional()
  public createdAt: string;

  @IsString()
  @IsOptional()
  public updatedAt: string;

  @IsString()
  @IsOptional()
  public engineer: EngineeringModel;

  @IsString()
  @IsOptional()
  public project: ProjectModel;

  @IsString()
  @IsOptional()
  public timeSheet: TimeSheetModel;
}
