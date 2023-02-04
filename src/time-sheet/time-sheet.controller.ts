import { Body, Controller, Get, HttpStatus, Patch, Query, Res, UseGuards, Post, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetTimeSheetReq, PatchTimeSheetReq, Status } from './dto/time-sheet-dto';
import { TimeSheetService } from './time-sheet.service';

@Controller('/api/time-sheet')
export class TimeSheetController {
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

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async updateTimeSheet(@Body() timeSheetReq: PatchTimeSheetReq,
  @Param('id') timeSheetId: number,
  @Res() response: any) {
    try {
      await this.timeSheetService.updateTimeSheet(timeSheetReq, timeSheetId, response);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to update time sheet.',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: err.message
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
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


  @Patch('/status')
  async status(
  @Body() timeSheetReq: Status,
  @Res() response: any) {
    try {
      await this.timeSheetService.updateStatus(timeSheetReq, response);
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
