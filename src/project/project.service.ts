import { HttpStatus, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { ProjectEntity } from "src/entities/project.entity";
import { UserRoles } from "src/user/dto/userModel/user-model";
import { UserEntity } from "src/user/entity/user.entity";
import { paginateResponse } from "src/utils/common";
import { Repository } from "typeorm";
import { ReqProject } from "./dto/project.dto";

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
      req.id
        ? selectQuery.andWhere("project.id = (:id)", { id: req.id })
        : selectQuery;
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

  public async getAllProject(
    reqProject: ReqProject,
    @Res() response: any
  ): Promise<any[]> {
    try {
      this.logger.log(`Got request to fetch project details by params`);
      const userDetail = await this.userRepo.findOne({
        where: { id: reqProject.userId },
      });

      if (userDetail?.role === UserRoles.TEAM_LEAD) {
        reqProject.filter.teamLeadId = userDetail.id;
      }
      if (userDetail?.role === UserRoles.MANAGER) {
        reqProject.filter.mangerId = userDetail.id;
      }
      if (userDetail?.role === UserRoles.ENGINEER) {
        reqProject.filter.engineerId = userDetail.id;
      }
      if (userDetail?.role === UserRoles.SALES) {
        reqProject.filter.salesId = userDetail.id;
      }

      let selectQuery = this.projectRepository.createQueryBuilder("project");

      if (reqProject && reqProject.filter) {
        let tempProject = reqProject.filter.engineerId
          ? selectQuery.andWhere("project.engineerId = :engineerId", {
              engineerId: reqProject.filter.engineerId,
            })
          : selectQuery;

        let tempQuery = reqProject.filter.teamLeadId
          ? selectQuery.andWhere("project.teamLeadId = :teamLeadId", {
              teamLeadId: reqProject.filter.teamLeadId,
            })
          : selectQuery;

        let tempProj = reqProject.filter.mangerId
          ? selectQuery.andWhere("project.mangerId = :mangerId", {
              teamLeadId: reqProject.filter.mangerId,
            })
          : selectQuery;

        let tempQue = reqProject.filter.projectId
          ? selectQuery.andWhere("project.id = :projectId", {
              projectId: reqProject.filter.projectId,
            })
          : selectQuery;

        let newProj = reqProject.filter.salesId
          ? selectQuery.andWhere("project.salesId = :salesId", {
              salesId: reqProject.filter.salesId,
            })
          : selectQuery;

        let newSelect = reqProject.filter.companyId
          ? selectQuery.andWhere("project.companyId = :companyId", {
              companyId: reqProject.filter.companyId,
            })
          : selectQuery;

        let reqProj = reqProject.filter.status
          ? selectQuery.andWhere("project.status = :status", {
              status: reqProject.filter.status,
            })
          : selectQuery;
      }

      if (reqProject.startTime) {
        selectQuery.andWhere("project.createdAt >= :createdAt", {
          createdAt: reqProject.startTime,
        });
      }
      if (reqProject.endTime) {
        selectQuery.andWhere("project.createdAt <= :createdAt", {
          createdAt: reqProject.endTime,
        });
      }
      if (reqProject && reqProject.filter && reqProject.filter.order) {
        if (reqProject.filter.order === "DESC") {
          selectQuery.orderBy("project.createdAt", "DESC");
        }
        if (reqProject.filter.order === "ASC") {
          selectQuery.orderBy("project.createdAt", "ASC");
        }
      }
      if (reqProject && reqProject.limit && reqProject.page) {
        selectQuery
          .skip(reqProject.limit * (reqProject.page - 1))
          .take(reqProject.limit);
      } else {
        reqProject.page = 1;
        reqProject.limit = 10;
      }

      const data = await selectQuery.getManyAndCount();
      const paginatedResponse = paginateResponse(
        data,
        reqProject.limit,
        reqProject.page
      );
      return response.status(HttpStatus.OK).json({
        success: true,
        message: "User has been created successfully",
        data: paginatedResponse,
      });
    } catch (err) {
      this.logger.error(
        `Error while fetching user for id ${reqProject} Err as ${err}`
      );
      throw new Error(`No Project has been found with ${JSON.stringify(err)}`);
    }
  }
}