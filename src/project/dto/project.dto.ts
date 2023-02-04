import { IsNumber, IsOptional, IsString } from "class-validator";
import { ManagerController } from "src/manager/manager.controller";

export class CreateProject {
  public projectName: string;

  @IsOptional()
  public description: string;

  @IsOptional()
  public clientName: string;

  @IsOptional()
  public startDate: string;

  @IsOptional()
  public endDate: string;
}

//
// Creation -->
//     projetc name
//     RTCSessionDescription
//     client name
//     start Date
//     end Date
//
//     sale person can onliy assign to manager
// Assign -->
//     Manager--> dropdwoan
//
//
//     Manger will se then this project
//     he can assign both team lead and enginner