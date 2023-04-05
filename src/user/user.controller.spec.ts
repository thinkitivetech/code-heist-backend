import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/userModel/create-user.dto';
import { HttpStatus } from '@nestjs/common';
import { UserRoles } from './dto/userModel/user-model';

describe('UserController', () => {
let controller: UserController;
let service: UserService;

beforeEach(async () => {
const module: TestingModule = await Test.createTestingModule({
controllers: [UserController],
providers: [UserService],
}).compile();

controller = module.get<UserController>(UserController);
service = module.get<UserService>(UserService);
});

describe('getUsers', () => {
it('should return an array of users', async () => {
const result = [{ id: 1, name: 'John' }];
jest.spyOn(service, 'getUsers').mockImplementation(async () => result);

  const req: any = null;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  await controller.getUsers(req, response);

  expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
  expect(response.json).toHaveBeenCalledWith({
    success: true,
    message: 'User list fetched successfully',
    data: result,
  });
});

it('should handle errors', async () => {
  const error = new Error('Internal Server Error');
  jest.spyOn(service, 'getUsers').mockImplementation(async () => {
    throw error;
  });

  const req: any = null;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  await controller.getUsers(req, response);

  expect(response.status).toHaveBeenCalledWith(
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    message: 'It seems there is some technical glitch at our end, Unable to fetch user list.',
    error_code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: error.message,
  });
});
});

describe('getUser', () => {
it('should return a user by id', async () => {
const result = {
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
jest.spyOn(service, 'getUserById').mockImplementation(async () => result);

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  await controller.getUser(1, response);

  expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
  expect(response.json).toHaveBeenCalledWith({
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

it('should handle errors', async () => {
  const error = new Error('Internal Server Error');
  jest.spyOn(service, 'getUserById').mockImplementation(async () => {
    throw error;
  });

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  await controller.getUser(1, response);

  expect(response.status).toHaveBeenCalledWith(
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    message: 'It seems there is some technical glitch at our end, Unable to fetch user Id.',
    error_code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: error.message,
  });
});
});

describe('createUser', () => {
it('should create a new user', async () => {
const createUserDto: CreateUserDto = {
  "name": "Test User",
  "password": "passworD1@",
  "email": "email@domain.com",
  "mobileNo": 1234567890,
  "role": UserRoles.MANAGER,
  "hashedPassword": "$2b$10$ntSWE04N9uRAU5S7uAj/xunPRr4IFVFMZ42SXodoPUrg4McisgXQ."
};
const result = {
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
jest.spyOn(service, 'createUser').mockImplementation(async () => result);

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  await controller.createUser(response, createUserDto);

  expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
  expect(response.json).toHaveBeenCalledWith({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

it('should handle errors', async () => {
  const createUserDto: CreateUserDto = {
    "name": "Test User",
    "password": "passworD1@",
    "email": "email@domain.com",
    "mobileNo": 1234567890,
    "role": UserRoles.MANAGER,
    "hashedPassword": "$2b$10$ntSWE04N9uRAU5S7uAj/xunPRr4IFVFMZ42SXodoPUrg4McisgXQ."
  };
  const error = new Error('Internal Server Error');
  jest.spyOn(service, 'createUser').mockImplementation(async () => {
    throw error;
  });

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  await controller.createUser(response, createUserDto);

  expect(response.status).toHaveBeenCalledWith(
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    message: 'It seems there is some technical glitch at our end, Unable to create user.',
    error_code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: error.message,
  });
})
})
})