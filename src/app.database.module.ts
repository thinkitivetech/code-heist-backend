import { Module } from '@nestjs/common';
import { databaseProviders } from './app.database.provider';
import { ManagerModule } from './manager/manager.module';
import { EngineerModule } from './engineer/engineer.module';
import { TimeSheetModule } from './time-sheet/time-sheet.module';
import { TeamLeadModule } from './team-lead/team-lead.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ProjectModule } from './project/project.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  imports: [ManagerModule, ProjectModule, TimesheetModule, TeamLeadModule, TimeSheetModule, EngineerModule],
})
export class DatabaseModule {}