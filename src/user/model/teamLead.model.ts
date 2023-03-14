import { IsOptional } from "class-validator";
import { EngineeringModel } from "./engineering.model";
import { ManagerModel } from "./manager.model";
import { ProjectModel } from "./project.model";

export class TeamLeadModel {
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
  public manger: ManagerModel;

  @IsOptional()
  public engineerDetails: EngineeringModel[];

  @IsOptional()
  public projectDetails: ProjectModel[];
}
