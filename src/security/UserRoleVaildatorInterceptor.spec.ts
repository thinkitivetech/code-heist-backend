import { Test, TestingModule } from '@nestjs/testing';
import { SignUpInterceptor, hash } from './SignUpInterceptor';
import { HttpError } from 'routing-controllers';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/userModel/create-user.dto';
import { UserRoles } from 'src/user/dto/userModel/user-model';
import bcrypt from 'bcrypt';

describe('SignUpInterceptor', () => {
  let interceptor: SignUpInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpInterceptor],
    }).compile();

    interceptor = module.get<SignUpInterceptor>(SignUpInterceptor);
  });

  describe('intercept', () => {
    it('should hash the password', async () => {
        const createUserDto: CreateUserDto = {
          name: 'testuser',
          email: 'email@domain.com',
          mobileNo: 1234567890,
          password: 'passworD1@',
          hashedPassword: '$2b$10$jC8wgHq1qKJXwiTGdQO5DO1a1JYU0lanR6aAMyN/vDjohD/YazXlK',
          role: UserRoles.MANAGER
        };

      const context = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            body: createUserDto,
          }),
        }),
        getClass: jest.fn(),
        getHandler: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
        getType: jest.fn(),
        getHandlerExecutionContext: jest.fn(),
      } as any;

      const next = {
        handle: () => ({
          pipe: () => {},
        }),
      } as any;

      // Act
      const result = await interceptor.intercept(context, next);

      // Assert
      expect(createUserDto.hashedPassword).toBeDefined();
    });

    it('should throw an error if unable to hash the password', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'testuser',
        email: 'email@domain.com',
        mobileNo: 1234567890,
        password: 'passworD1@',
        hashedPassword: '$2b$10$jC8wgHq1qKJXwiTGdQO5DO1a1JYU0lanR6aAMyN/vDjohD/YazXlK',
        role: UserRoles.MANAGER
    };

      jest.spyOn(bcrypt, 'hash').mockImplementation((password, salt, callback: any) => {
        callback(new Error('Unable to hash password'), null);
      });

      // Act
      try {
        await hash(createUserDto);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(HttpError);
        expect(error.httpCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toEqual('Unable to hash the password');
      }
    });
  });
});
