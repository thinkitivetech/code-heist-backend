import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
import { LoginModule } from 'src/login/login.module';
import { TaskService } from './task.service';
import { TaskSheetEntity } from '../entity/taskTimeSheet.entity';
import { UserModule } from '../user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskSheetEntity]), NestjsWinstonLoggerModule.forRoot({
    format: format.combine(
      format.timestamp({ format: 'isoDateTime' }),
      format.json(),
      format.colorize({ all: true })
    ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
      new transports.Console(),
    ],
  })],
  providers: [TaskService]
})
export class TaskModule {}
