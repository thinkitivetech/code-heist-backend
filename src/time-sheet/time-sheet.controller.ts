import { Body, Controller, Get, HttpStatus, Patch, Query, Res, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetTimeSheetReq, PatchTimeSheetReq } from './dto/time-sheet-dto';
import { TimeSheetService } from './time-sheet.service';

@Controller('/api/user')
export class UserController {
  constructor(private timeSheetService: TimeSheetService) {
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getTimeSheet(
    @Query() timeSheetRequest: GetTimeSheetReq,
    @Res() response: any) {
    try {
      this.timeSheetService.getTimeSheet(timeSheetRequest, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to fetch Time sheet.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  public async getAllTimeSheet(
    @Query() timeSheetRequest: GetTimeSheetReq,
    @Res() response: any) {
    try {
      this.timeSheetService.getAllTimeSheet(timeSheetRequest, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to fetch Time sheet.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }

  @Patch('/:id')
  async updateTimeSheet(@Body() timeSheetReq: PatchTimeSheetReq, @Res() response: any) {
    try {
      await this.timeSheetService.updateTimeSheet(timeSheetReq, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to create user.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }


  @Post()
  async createTimeSheet(@Body() timeSheetReq: PatchTimeSheetReq, @Res() response: any) {
    try {
      await this.timeSheetService.createTimeSheet(timeSheetReq, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to create user.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }

}
