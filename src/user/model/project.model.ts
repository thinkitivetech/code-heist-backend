import { IsNumber, IsOptional, IsString } from "class-validator";
import { EngineeringModel } from "./engineering.model";
import { ManagerModel } from "./manager.model";
import { ProfileModel } from "./profile.model";
import { TeamLeadModel } from "./teamLead.model";
import { TimeSheetModel } from "./timeSheet.model";
export class assignedTo {
  @IsString()
  @IsOptional()
  manger: string;

  @IsString()
  @IsOptional()
  teamLead: string;

  @IsString()
  @IsOptional()
  engineer: string;
}

export class ProjectModel {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsString()
  @IsOptional()
  public projectName: string;

  @IsString()
  @IsOptional()
  public status: string;

  @IsString()
  @IsOptional()
  public assignedToDetails: assignedTo;

  @IsString()
  @IsOptional()
  public clientName: string;

  @IsString()
  @IsOptional()
  public createdAt: string;

  @IsString()
  @IsOptional()
  public updatedAt: string;

  @IsString()
  @IsOptional()
  public manger: ManagerModel;

  @IsString()
  @IsOptional()
  public timeSheet: TimeSheetModel;

  @IsString()
  @IsOptional()
  public teamLead: TeamLeadModel;

  @IsString()
  @IsOptional()
  public engineerDetails: EngineeringModel;

  @IsString()
  @IsOptional()
  public profileDetails: ProfileModel[];
}

