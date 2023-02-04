import { IsNumber, IsOptional, IsString } from "class-validator";
import { Profile } from "passport";
import { EngineeringModel } from "./engineering.model";
import { ProfileModel } from "./profile.model";
import { ProjectModel } from "./project.model";
import { TaskTimeSheetModel } from "./taskTimeSheet.model";

export class TimeSheetModel {
  @IsOptional()
  public id: number;

  @IsOptional()
  public name: string;

  @IsOptional()
  public projects: string;

  @IsOptional()
  public assignedTO: string;

  @IsOptional()
  public status: string;

  @IsOptional()
  public createdAt: string;

  @IsOptional()
  public updatedAt: string;

  @IsOptional()
  public project: ProjectModel;

  @IsOptional()
  public profile: ProfileModel;

  @IsOptional()
  public engineer: EngineeringModel;

  @IsOptional()
  public taskDetails: TaskTimeSheetModel[];
}
