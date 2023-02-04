import { Controller, Get, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Patch } from 'routing-controllers';
import { GetTimeSheetReq } from './dto/time-sheet-dto';
import { TimeSheetService } from './time-sheet.service';

@Controller('user')
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

}
