import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { TaskSheetEntity } from 'src/entities/taskTimeSheet.entity';
import { Repository } from 'typeorm';
import { TaskService } from './task.service';
import { paginateResponse } from 'src/utils/common';
import { method } from 'bluebird';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();
    let taskService: TaskService;
    let mockRepository: Repository<TaskSheetEntity>;
    let mockLogger:any;
  
    beforeEach(async () => {
      mockRepository = createMock<Repository<TaskSheetEntity>>();
      mockLogger = createMock<NestjsWinstonLoggerService>();
      taskService = new TaskService(mockRepository, mockLogger);
    });
    service = module.get<TaskService>(TaskService);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getTasks', () => {
    it('should return paginated response', async () => {
        // Arrange
        const taskService = new TaskService(mockRepository, mockLogger);
        const mockReq = { id: 1, limit: 10, page: 1 };
        const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockData = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
        const mockCount = 2;
        const expectedResponse = {
            success: true,
            message: 'User has been created successfully',
            data: { items: mockData, total: mockCount }
        };
        const paginateResponseSpy:any = jest.spyOn(paginateResponse,method);

        // Act
        const result = await taskService.getTasks(mockReq, mockResponse);

        // Assert
        expect(mockLogger.log).toHaveBeenCalledWith(`Got request to fetch user by type`);
        expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('task');
        expect(mockReq.page).toBe(1);
        expect(mockReq.limit).toBe(10);
        expect(paginateResponseSpy).toHaveBeenCalledWith(mockData, mockReq.limit, mockReq.page);
        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
    });

    it('should throw an error when an exception is thrown', async () => {
        // Arrange
        const taskService = new TaskService(mockRepository, mockLogger);
        const mockReq = { id: 1, limit: 10, page: 1 };
        const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockError = new Error('Test error');
        jest.spyOn(mockRepository, 'createQueryBuilder').mockImplementation(() => { throw mockError; });

        // Act & Assert
        await expect(taskService.getTasks(mockReq, mockResponse)).rejects.toThrowError();
        expect(mockLogger.error).toHaveBeenCalledWith(`Error while fetching user for id ${mockReq} Err as ${mockError}`);
    });
});

});
});

function createMock<T>(): Repository<TaskSheetEntity> {
  throw new Error('Function not implemented.');
}

