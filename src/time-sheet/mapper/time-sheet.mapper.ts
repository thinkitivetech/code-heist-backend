import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { TimeSheetEntity } from 'src/entities/timesheet.entity';
import { Builder } from 'builder-pattern';
import { PatchTimeSheetReq } from '../dto/time-sheet-dto';

@Injectable()
export class TimeSheetMapper {

    constructor(

    ) { }
    public toTimeSheetEntity(timeSheetRequest: PatchTimeSheetReq): TimeSheetEntity {
        return Builder(TimeSheetEntity)
            .engineerId(timeSheetRequest.engineerId)
            .build();
    }
}
