import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  describe('getProject', () => {
    it('should return all projects successfully', async () => {
      const reqProject : any  = {};
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const projects = [{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }];
      jest.spyOn(service, 'getAllProject').mockResolvedValueOnce(projects);

      await controller.getProject(reqProject, response);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: 'Projects fetched successfully',
        data: projects,
      });
    });

    it('should return an error message when getAllProject throws an error', async () => {
      const reqProject : any = {};
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const errorMessage = 'Unable to fetch project list.';
      jest.spyOn(service, 'getAllProject').mockRejectedValueOnce(new Error(errorMessage));

      await controller.getProject(reqProject, response);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.json).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: errorMessage,
      });
    });
  });

  describe('getUser', () => {
    it('should return a project with the given id successfully', async () => {
      const id = 1;
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const project : any = { id: 1, name: 'Project 1' };
      jest.spyOn(service, 'getProjects').mockResolvedValueOnce(project);

      await controller.getUser(id, response);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: `Project with id ${id} fetched successfully`,
        data: project,
      });
    });

    it('should return an error message when getProjects throws an error', async () => {
      const id = 1;
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const errorMessage = 'Unable to fetch project with id 1.';
      jest.spyOn(service, 'getProjects').mockRejectedValueOnce(new Error(errorMessage));

      await controller.getUser(id, response);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.json).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: errorMessage,
      });
    });
  });
});
