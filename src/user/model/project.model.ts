import { IsNumber, IsOptional, IsString } from "class-validator";
import { EngineeringModel } from "./engineering.model";
import { ManagerModel } from "./manager.model";
import { ProfileModel } from "./profile.model";
import { TeamLeadModel } from "./teamLead.model";
import { TimeSheetModel } from "./timeSheet.model";
export class assignedTo {
  @IsOptional()
  manger: string;

  @IsOptional()
  teamLead: string;

  @IsOptional()
  engineer: string;
}

export class ProjectModel {
  @IsOptional()
  public id: number;

  @IsOptional()
  public projectName: string;

  @IsOptional()
  public status: string;

  @IsOptional()
  public assignedToDetails: assignedTo;

  @IsOptional()
  public clientName: string;

  @IsOptional()
  public createdAt: string;

  @IsOptional()
  public updatedAt: string;

  @IsOptional()
  public manger: ManagerModel;

  @IsOptional()
  public timeSheet: TimeSheetModel;

  @IsOptional()
  public teamLead: TeamLeadModel;

  @IsOptional()
  public engineerDetails: EngineeringModel;

  @IsOptional()
  public profileDetails: ProfileModel[];
}

