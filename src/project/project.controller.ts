import { Controller, Get, HttpStatus, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRequestDto } from 'src/user/dto/userModel/create-user.dto';
import { reqProject } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('/api/project')
export class ProjectController {
    constructor(private projectService: ProjectService) {
    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getUsers(
      @Query() req: reqProject,
      @Res() response: any) {
      try {
        this.projectService.getAllProject(req, response);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'It seems there is some technical glitch at our end, Unable to fetch user list.',
          error_code: HttpStatus.INTERNAL_SERVER_ERROR,
          data: err.message
        });
      }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/id')
    public async getUser(
      @Param() id: number,
      @Res() response: any
    ) {
      try {
        // this.userService.getUserById(id, response);
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
