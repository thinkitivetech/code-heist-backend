import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProjectModel } from "./project.model";
import { TeamLeadModel } from "./teamLead.model";

export class ManagerModel {
  @IsOptional()
  public id: number;

  @IsOptional()
  public name: string;

  @IsOptional()
  public mobileNo: string;

  @IsOptional()
  public mail: string;

  @IsOptional()
  public updatedDetail: string;

  @IsOptional()
  public createdAt: string;

  @IsOptional()
  public updatedAt: string;

  @IsOptional()
  public projectDetails: ProjectModel[];

  @IsOptional()
  public teamLeadDetails: TeamLeadModel[];
}
