import { Controller, Get, HttpStatus, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ReqProject } from "./dto/project.dto";
import { ProjectService } from "./project.service";

@Controller("/api/project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @UseGuards(AuthGuard("jwt"))
  @Get()
  public async getProject(
    @Query() reqProject: ReqProject,
    @Res() response: any
  ) {
    try {
      await this.projectService.getAllProject(reqProject, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          "It seems there is some technical glitch at our end, Unable to fetch project list.",
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message,
      });
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/id")
  public async getUser(@Param() id: number, @Res() response: any) {
    try {
      await this.projectService.getProjects(id, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          "It seems there is some technical glitch at our end, Unable to fetch user Id.",
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message,
      });
    }
  }
}
