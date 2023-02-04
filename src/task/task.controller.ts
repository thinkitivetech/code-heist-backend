import { Controller, Get, HttpStatus, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRequestDto } from '../user/dto/userModel/create-user.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService) {
    }

    @Get()
    public async getUsers(
      @Query() req: UserRequestDto,
      @Res() response: any) {
      try {
        this.taskService.getTasks(req, response);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'It seems there is some technical glitch at our end, Unable to fetch user list.',
          error_code: HttpStatus.INTERNAL_SERVER_ERROR,
          data: err.message
        });
      }
    }

    @Get('/id')
    public async getUser(
      @Query() id: number,
      @Res() response: any
    ) {
      try {
        this.taskService.getTaskById(id, response);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'It seems there is some technical glitch at our end, Unable to fetch user Id.',
          error_code: HttpStatus.INTERNAL_SERVER_ERROR,
          data: err.message
        });
      }
    }
}
