import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

describe("TaskController", () => {
  let controller: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: jest.fn(),
            getTaskById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  describe("getUsers", () => {
    it("should call taskService.getTasks and return the result", async () => {
      const req = { name: "John", page: 1, limit: 10, email: "email@domain.com", mobileNo: 1234567890 };
      const res = { json: jest.fn(), status: jest.fn() };
      const expectedResult = [{ id: 1, name: "Task 1" }, { id: 2, name: "Task 2" }];

      jest.spyOn(taskService, "getTasks").mockResolvedValue(expectedResult);

      await controller.getUsers(req, res);

      expect(taskService.getTasks).toHaveBeenCalledWith(req, res);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Tasks fetched successfully",
        data: expectedResult,
      });
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it("should return an error response if taskService.getTasks throws an error", async () => {
      const req = { name: "John", page: 1, limit: 10, email: "email@domain.com", mobileNo: 1234567890 };
      const res = { json: jest.fn(), status: jest.fn() };
      const errorMessage = "Internal server error";

      jest.spyOn(taskService, "getTasks").mockRejectedValue(new Error(errorMessage));

      await controller.getUsers(req, res);

      expect(taskService.getTasks).toHaveBeenCalledWith(req, res);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message:
          "It seems there is some technical glitch at our end, Unable to fetch user list.",
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: errorMessage,
      });
      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});