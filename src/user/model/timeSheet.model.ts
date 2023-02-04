import { IsNumber, IsOptional, IsString } from "class-validator";
import { Profile } from "passport";
import { EngineeringModel } from "./engineering.model";
import { ProfileModel } from "./profile.model";
import { ProjectModel } from "./project.model";
import { TaskTimeSheetModel } from "./taskTimeSheet.model";

export class TimeSheetModel {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public projects: string;

  @IsString()
  @IsOptional()
  public assignedTO: string;

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
  public project: ProjectModel;

  @IsString()
  @IsOptional()
  public profile: ProfileModel;

  @IsString()
  @IsOptional()
  public engineer: EngineeringModel;

  @IsString()
  @IsOptional()
  public taskDetails: TaskTimeSheetModel[];
}
