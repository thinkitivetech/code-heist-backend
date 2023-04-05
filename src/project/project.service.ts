import { HttpStatus, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { ProjectEntity } from "src/entities/project.entity";
import { UserRoles } from "src/user/dto/userModel/user-model";
import { UserEntity } from "src/user/entity/user.entity";
import { paginateResponse } from "src/utils/common";
import { Repository } from "typeorm";

export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    @InjectLogger() private logger: NestjsWinstonLoggerService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) {}

  public async getProjects(req: any, @Res() response: any): Promise<any[]> {
    try {
      this.logger.log(`Got request to fetch project details`);

      let selectQuery = this.projectRepository.createQueryBuilder("project");
      if(req.id) selectQuery.andWhere("project.id = (:id)", { id: req.id })
      if (req && req.limit && req.page) {
        selectQuery.skip(req.limit * (req.page - 1)).take(req.limit);
      } else {
        req.page = 1;
        req.limit = 10;
      }

      const data = await selectQuery.getManyAndCount();
      const paginatedResponse = paginateResponse(data, req.limit, req.page);
      return response.status(HttpStatus.CREATED).json({
        success: true,
        message: "User has been created successfully",
        data: paginatedResponse,
      });
    } catch (err) {
      this.logger.error(
        `Error while fetching user for id ${req} Err as ${err}`
      );
      throw new Error();
    }
  }

  public async getAllProject(reqProject: any, @Res() response: any): Promise<any[]> {
    try {
      this.logger.log(`Got request to fetch project details by params`);
      const userDetail = await this.userRepo.findOne({ where: { id: reqProject.userId } });
  
      const roleMapping : any = {
        [UserRoles.TEAM_LEAD]: "teamLeadId",
        [UserRoles.MANAGER]: "mangerId",
        [UserRoles.ENGINEER]: "engineerId",
        [UserRoles.SALES]: "salesId",
      };
  
      if (userDetail?.role && roleMapping[userDetail.role]) {
        reqProject.filter[roleMapping[userDetail.role]] = userDetail.id;
      }
  
      const selectQuery = this.projectRepository.createQueryBuilder("project");
  
      const filters = [
        { field: "engineerId", value: reqProject.filter.engineerId },
        { field: "teamLeadId", value: reqProject.filter.teamLeadId },
        { field: "managerId", value: reqProject.filter.mangerId },
        { field: "projectId", value: reqProject.filter.projectId },
        { field: "salesId", value: reqProject.filter.salesId },
        { field: "companyId", value: reqProject.filter.companyId },
        { field: "status", value: reqProject.filter.status },
      ];
  
      filters.forEach(({ field, value }) => {
        if (value) {
          selectQuery.andWhere(`project.${field} = :${field}`, { [field]: value });
        }
      });
  
      if (reqProject.startTime) {
        selectQuery.andWhere("project.createdAt >= :createdAt", { createdAt: reqProject.startTime });
      }
      if (reqProject.endTime) {
        selectQuery.andWhere("project.createdAt <= :createdAt", { createdAt: reqProject.endTime });
      }
      if (reqProject.filter?.order) {
        const direction = reqProject.filter.order === "ASC" ? "ASC" : "DESC";
        selectQuery.orderBy("project.createdAt", direction);
      }
  
      reqProject.page = reqProject.page || 1;
      reqProject.limit = reqProject.limit || 10;
  
      selectQuery.skip(reqProject.limit * (reqProject.page - 1)).take(reqProject.limit);
  
      const [data, count] = await selectQuery.getManyAndCount();
      const paginatedResponse = paginateResponse(data, reqProject.limit, reqProject.page);
  
      return response.status(HttpStatus.OK).json({
        success: true,
        message: "Projects have been fetched successfully",
        data: paginatedResponse,
        count,
      });
    } catch (err) {
      this.logger.error(err);
      throw new Error(`No Project has been found with ${JSON.stringify(err)}`);
    }
  }      
}