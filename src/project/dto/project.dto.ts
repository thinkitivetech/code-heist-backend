import { IsNumber, IsOptional, IsString } from "class-validator";
import { ManagerController } from "src/manager/manager.controller";

export class CreateProject {

    @IsString()
    public projectName: string;

    @IsOptional()
    @IsString()
    public description: string;

    @IsOptional()
    @IsString()
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