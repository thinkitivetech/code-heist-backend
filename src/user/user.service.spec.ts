import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('getUsers', () => {
    it('should return a paginated list of users', async () => {
      const expectedData = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      const req = { limit: 10, page: 1 };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue({ success: true, data: expectedData }),
      };
      const createQueryBuilderSpy = jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue({
          andWhere: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getManyAndCount: jest.fn().mockReturnValue(expectedData),
        } as any);

      const result = await userService.getUsers(req, response);

      expect(result).toEqual({
        success: true,
        data: expectedData,
      });
      expect(createQueryBuilderSpy).toHaveBeenCalledWith('user');
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: expectedData,
      });
    });

    it('should handle errors', async () => {
      const req = { limit: 10, page: 1 };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue({ success: false }),
      };
      const createQueryBuilderSpy = jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue({
          andWhere: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getManyAndCount: jest.fn().mockRejectedValue(new Error()),
        } as any);
      const loggerErrorSpy = jest.spyOn(userService['logger'], 'error');

      expect(async () => {
        await userService.getUsers(req, response);
      }).rejects.toThrowError();
      expect(createQueryBuilderSpy).toHaveBeenCalledWith('user');
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        success: false,
      });
      expect(loggerErrorSpy).toHaveBeenCalled();
    });
  });



})  
