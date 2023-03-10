import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
import { LoginModule } from 'src/login/login.module';
import { TaskController } from '../task/task.controller';
import { TaskModule } from '../task/task.module';
import { UserEntity } from './entity/user.entity';
import { TaskSheetEntity } from 'src/entities/taskTimeSheet.entity';
import { ProjectEntity } from 'src/entities/project.entity';
import { TaskService } from 'src/task/task.service';
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
