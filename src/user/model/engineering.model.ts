import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProfileModel } from "./profile.model";
import { ProjectModel } from "./project.model";
import { TeamLeadModel } from "./teamLead.model";
import { TimeSheetModel } from "./timeSheet.model";

export class EngineeringModel {
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
  public teamLead: TeamLeadModel;

  @IsOptional()
  public profileDetails: ProfileModel[];

  @IsOptional()
  public timeSheetDetails: TimeSheetModel[];

  @IsOptional()
  public projectDetails: ProjectModel[];
}
