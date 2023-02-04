import { Logger, Module } from '@nestjs/common';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { format, transports } from 'winston';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { UserService } from './user/user.service';
import { TimeSheetModel } from './user/model/timeSheet.model';
import { TimeSheetModule } from './time-sheet/time-sheet.module';
import { TaskModule } from './task/task.module';

@Module({
  controllers: [AppController],
  imports: [UserModule, TimeSheetModule, TaskModule, LoginModule, TypeOrmModule.forRootAsync(typeOrmConfigAsync), ConfigModule.forRoot()],
  providers: [AppService],

})
export class AppModule { }
