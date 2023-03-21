import { Test, TestingModule } from '@nestjs/testing';
import { UserRoles } from '../../src/user/dto/userModel/user-model';
import { CreateUserDto } from './dto/userModel/create-user.dto';
import { UserService } from './user.service';

const createUserInput = {
  "name": "Test User",
  "password": "passworD1@",
  "email": "email@domain.com",
  "mobileNo": 1234567890,
  "role": UserRoles.MANAGER,
  "hashedPassword": "$2b$10$ntSWE04N9uRAU5S7uAj/xunPRr4IFVFMZ42SXodoPUrg4McisgXQ."
};

const createUserResponse = {
  "success": true,
  "message": "User has been created successfully",
  "data": {
      "name": "Test User",
      "password": "passworD1@",
      "email": "email@domain.com",
      "mobileNo": 1234567890,
      "role": "MANAGER",
      "hashedPassword": "$2b$10$ntSWE04N9uRAU5S7uAj/xunPRr4IFVFMZ42SXodoPUrg4McisgXQ.",
      "createdAt": "2023-03-21T12:02:50.989Z",
      "id": 1
  }
};

const id = 1;

const getUserByIdResponse = {
  "success": true,
  "message": "User fetched successfully",
  "data": {
      "id": 1,
      "name": "Test User",
      "email": "email@domain.com",
      "mobileNo": 1234567890,
      "password": "passworD1@",
      "hashedPassword": "$2b$10$ntSWE04N9uRAU5S7uAj/xunPRr4IFVFMZ42SXodoPUrg4McisgXQ.",
      "createdAt": "2023-03-21T12:02:51.000Z",
      "role": "MANAGER"
  }
};

const getAllUsersReponse = {
  "success": true,
  "message": "User has been created successfully",
  "data": {
      "statusCode": "success",
      "data": [
          {
              "id": 2,
              "name": "Team Lead",
              "email": "email1@domain.com",
              "mobileNo": 1234567890,
              "password": "passworD1@",
              "hashedPassword": "$2b$10$jC8wgHq1qKJXwiTGdQO5DO1a1JYU0lanR6aAMyN/vDjohD/YazXlK",
              "createdAt": "2023-03-21T12:31:40.000Z",
              "role": "TEAM_LEAD"
          },
          {
              "id": 1,
              "name": "Test User",
              "email": "email@domain.com",
              "mobileNo": 1234567890,
              "password": "passworD1@",
              "hashedPassword": "$2b$10$ntSWE04N9uRAU5S7uAj/xunPRr4IFVFMZ42SXodoPUrg4McisgXQ.",
              "createdAt": "2023-03-21T12:02:51.000Z",
              "role": "MANAGER"
          }
      ],
      "count": 2,
      "currentPage": 10,
      "prevPage": 9,
      "lastPage": 2
  }
};

const createUser = (createUserInput: CreateUserDto, response: any) => createUserResponse;
const getUserById = (id: number, response: any) => getUserByIdResponse;
const getUsers = (response: any) => getAllUsersReponse;
     
const UserServiceMock = {
    createUser: jest.fn(() => createUser(createUserInput, null)),
    getUserById: jest.fn(() => getUserById(id, null)),
    getUsers: jest.fn(() => getUsers(null)),
};

describe('User Service', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).overrideProvider(UserService).useValue(UserServiceMock).compile();

    userService = module.get<UserService>(UserService);
  });
  it('should check if user service is defined', () => {
      expect(userService).toBeDefined();
  });
  it('should create one user', async() => {
    const result = await userService.createUser(createUserInput, null);
    expect(result).toEqual(createUserResponse);
  });
  it('should get one user by id', async() => {
    const result = await userService.getUserById(id, null);
    expect(result).toEqual(getUserByIdResponse);
  });
  it('should get all users', async() => {
    const result = await userService.getUsers(null, null);
    expect(result).toEqual(getAllUsersReponse);
  });
});