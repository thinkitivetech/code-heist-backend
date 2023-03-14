import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { ProjectEntity } from "src/entities/project.entity";
import { TaskSheetEntity } from "src/entities/taskTimeSheet.entity";
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
import { TaskService } from "src/task/task.service";
import { format, transports } from "winston";
import { TaskController } from '../task/task.controller';
import { TaskModule } from '../task/task.module';
import { UserEntity } from './entity/user.entity';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
@Module({
  controllers: [UserController,TaskController],
  providers: [UserService,TaskService],
  imports: [ TypeOrmModule.forFeature([UserEntity,TaskSheetEntity , ProjectEntity]), NestjsWinstonLoggerModule.forRoot({
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
  }), TaskModule
],
exports: [UserService],

})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer)  {
    consumer.apply(JWTAuthMiddleware)
    .forRoutes(UserController)
  }
}
