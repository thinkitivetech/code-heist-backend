import { IsNumber, IsOptional, IsString } from "class-validator";
import { ManagerController } from "src/manager/manager.controller";
import { FilterModel } from "src/time-sheet/dto/time-sheet-dto";

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

export class ReqProject {

    @IsOptional()
    public projectId: number;

    @IsString()
    @IsOptional()
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

    @IsOptional()
    public filter: FilterModel;

    @IsString()
    @IsOptional()
    public startTime: string;

    @IsString()
    @IsOptional()
    public endTime: string;

    @IsOptional()
    public limit: number;

    @IsOptional()
    public userId: number;

    @IsOptional()
    public page: number;

}