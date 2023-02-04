import { Test, TestingModule } from '@nestjs/testing';
import { UserRoles } from '../../users/schema/users.schema';
import { LoginController } from '../login.controller';
import { LoginService } from '../login.service';

const loginInput = {
    "emailId": "email@domain.com",
    "password": "password",
    "userRole": UserRoles.ADMIN
};

const loginResponse = {
    "message": "User logged in successfully",
    "jwtDetails": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiZW1haWxAZG9tYWluLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJ1c2VyUm9sZSI6IkFETUlOIiwiaWF0IjoxNjc0MzAyOTc0LCJleHAiOjE2NzQzMDI5Nzl9.VumRIabfXisHw8z--9hEvpsoAgFGjFx5sAriEDG3sV8"
};

const LoginServiceMock = {
    loginUser: jest.fn(() => loginResponse),
};

describe('LoginController', () => {
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).overrideProvider(LoginService).useValue(LoginServiceMock).compile();

    loginService = module.get<LoginService>(LoginService);
  });

  describe('LoginService', () => {
    it('LoginService should be defined', () => {
        expect(loginService).toBeDefined();
    })
    it('should login user and return success message and jwt details', async () => {
        const result = await loginService.loginUser(loginInput);
        expect(result).toEqual(loginResponse);
    });
  });
});