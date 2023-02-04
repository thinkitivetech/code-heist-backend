import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProfileModel } from "./profile.model";
import { ProjectModel } from "./project.model";
import { TeamLeadModel } from "./teamLead.model";
import { TimeSheetModel } from "./timeSheet.model";

export class EngineeringModel {
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
  public teamLead: TeamLeadModel;

  @IsString()
  @IsOptional()
  public profileDetails: ProfileModel[];

  @IsString()
  @IsOptional()
  public timeSheetDetails: TimeSheetModel[];

  @IsString()
  @IsOptional()
  public projectDetails: ProjectModel[];
}
