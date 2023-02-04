import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProjectModel } from "./project.model";
import { TeamLeadModel } from "./teamLead.model";

export class ManagerModel {
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
  public updatedDetail: string;

  @IsString()
  @IsOptional()
  public createdAt: string;

  @IsString()
  @IsOptional()
  public updatedAt: string;

  @IsString()
  @IsOptional()
  public projectDetails: ProjectModel[];

  @IsString()
  @IsOptional()
  public teamLeadDetails: TeamLeadModel[];
}
