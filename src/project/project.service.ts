import { HttpStatus, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectLogger, NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { ProjectEntity } from 'src/entities/project.entity';
import { applyPassportStrategy } from 'src/security/JWTMiddleware';
import { UserRoles } from 'src/user/dto/userModel/user-model';
import { UserEntity } from 'src/user/entity/user.entity';
import { paginateResponse } from 'src/utils/common';
import { Brackets, Repository } from 'typeorm';
import { ReqProject } from './dto/project.dto';

export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectLogger() private logger: NestjsWinstonLoggerService,
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

    ) { }

    public async getProjects(req: any, @Res() response: any): Promise<any[]> {
        try {

            this.logger.log(`Got request to fetch project details`)

            let selectQuery = this.projectRepository.createQueryBuilder('project');
            if (req) {
                req.id ? selectQuery.andWhere('project.id = (:id)', { id: req.id }) : selectQuery;
            }
            // selectQuery.orderBy('project.createdAt', 'DESC');
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
                message: 'User has been created successfully',
                data: paginatedResponse,
            });
        } catch (err) {
            this.logger.error(`Error while fetching user for id ${req} Err as ${err}`);
            throw new Error
        }
    }


    public async getAllProject(reqProject: ReqProject, @Res() response: any): Promise<any[]> {
        try {

            this.logger.log(`Got request to fetch project details by params`)

            if (!reqProject.userId) {
            }
            let user: any;
            const loggedInUser = await applyPassportStrategy();
            if (loggedInUser && loggedInUser.email || reqProject.userId) {
                if (reqProject.userId !== undefined) {
                    user = await this.userRepo.findOne({ where: { id: reqProject.userId } });
                } else if (user) {
                    user = await this.userRepo.findOne({ where: { email: loggedInUser.email } });
                }
            }
            if (!user) {
                this.logger.error(`User not found for email ${loggedInUser.email}`);
                throw new Error('No Project has been found`');

            }

            if (user.role === UserRoles.TEAM_LEAD) {
                reqProject.filter.teamLeadId = user.id;
            }
            if (user.role === UserRoles.MANAGER) {
                reqProject.filter.mangerId = user.id;
            }
            if (user.role === UserRoles.ENGINEER) {
                reqProject.filter.engineerId = user.id;
            }
            if (user.role === UserRoles.SALES) {
                reqProject.filter.salesId = user.id;
            }

            let selectQuery = this.projectRepository.createQueryBuilder('project')
                .leftJoinAndSelect('project.engineerDetails', 'engineer')
                .leftJoinAndSelect('project.sales', 'sales')
                .leftJoinAndSelect('project.profileDetails', 'profile')
                .leftJoinAndSelect('project.teamLead', 'teamLead')
                .leftJoinAndSelect('project.manager', 'manager')

            if (reqProject && reqProject.filter) {
                reqProject.filter.engineerId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.engineerId = :engineerId', { engineerId: reqProject.filter.engineerId })
                })) : selectQuery;

                reqProject.filter.teamLeadId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.teamLeadId = :teamLeadId', { teamLeadId: reqProject.filter.teamLeadId })
                })) : selectQuery;

                reqProject.filter.mangerId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.mangerId = :mangerId', { teamLeadId: reqProject.filter.mangerId })
                })) : selectQuery;


                reqProject.filter.projectId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.id = :projectId', { projectId: reqProject.filter.projectId })
                })) : selectQuery;


                reqProject.filter.salesId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.salesId = :salesId', { salesId: reqProject.filter.salesId })
                        .orWhere('sales.name like (:salesName)', { salesName: '%' + reqProject.filter.salesName + '%' })
                })) : selectQuery;


                reqProject.filter.companyId ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.companyId = :companyId', { companyId: reqProject.filter.companyId })
                })) : selectQuery;


                reqProject.filter.status ? selectQuery.andWhere(new Brackets(obj => {
                    obj.where('project.status = :status', { status: reqProject.filter.status })
                })) : selectQuery;

            }

            if (reqProject.startTime) {
                selectQuery.andWhere('project.createdAt >= :createdAt', { createdAt: reqProject.startTime })
            }
            if (reqProject.endTime) {
                selectQuery.andWhere('project.createdAt <= :createdAt', { createdAt: reqProject.endTime })
            }
            if (reqProject && reqProject.filter && reqProject.filter.order) {
                if (reqProject.filter.order === 'DESC') {
                    selectQuery.orderBy('project.createdAt', 'DESC');
                }
                if (reqProject.filter.order === 'ASC') {
                    selectQuery.orderBy('project.createdAt', 'ASC');
                }
            }
            if (reqProject && reqProject.limit && reqProject.page) {
                selectQuery.skip(reqProject.limit * (reqProject.page - 1)).take(reqProject.limit);
            } else {
                reqProject.page = 1;
                reqProject.limit = 10;
            }

            const data = await selectQuery.getManyAndCount();
            const paginatedResponse = paginateResponse(data, reqProject.limit, reqProject.page);
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'User has been created successfully',
                data: paginatedResponse,
            });
        } catch (err) {
            this.logger.error(`Error while fetching user for id ${reqProject} Err as ${err}`);
            throw new Error(`No Project has been found with ${JSON.stringify(err)}`);
        }
    }



}