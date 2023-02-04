import { IsNumber, IsOptional, IsString } from "class-validator";
import { EngineeringModel } from "./engineering.model";
import { ProjectModel } from "./project.model";
import { TimeSheetModel } from "./timeSheet.model";

export class ProfileModel {
  @IsOptional()
  public id: number;

  @IsOptional()
  public name: string;

  @IsOptional()
  public mobileNo: string;

  @IsOptional()
  public mail: string;

  @IsOptional()
  public createdAt: string;

  @IsOptional()
  public updatedAt: string;

  @IsOptional()
  public engineer: EngineeringModel;

  @IsOptional()
  public project: ProjectModel;

  @IsOptional()
  public timeSheet: TimeSheetModel;
}
