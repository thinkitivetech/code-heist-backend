import { IsNumber, IsOptional, IsString } from "class-validator";
import { EngineeringModel } from "./engineering.model";
import { ManagerModel } from "./manager.model";
import { ProjectModel } from "./project.model";

export class TeamLeadModel {
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
  public manger: ManagerModel;

  @IsString()
  @IsOptional()
  public engineerDetails: EngineeringModel[];

  @IsString()
  @IsOptional()
  public projectDetails: ProjectModel[];
}
