import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { ProjectEntity } from "src/entities/project.entity";
import { JWTAuthMiddleware } from "src/security/JWTMiddleware";
import { UserEntity } from "src/user/entity/user.entity";
import { format, transports } from 'winston';
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, UserEntity]), NestjsWinstonLoggerModule.forRoot({
      format: format.combine(
        format.timestamp({ format: 'isoDateTime' }),
        format.json(),
        format.colorize({ all: true })
      ),
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
        new transports.Console(),
      ]
    })
  ],
})

export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTAuthMiddleware)
      .forRoutes(ProjectController)
  }
}
