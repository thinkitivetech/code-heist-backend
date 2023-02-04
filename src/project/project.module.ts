import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
import { ProjectEntity } from 'src/entities/project.entity';
@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [ 
    TypeOrmModule.forFeature([ProjectEntity]), NestjsWinstonLoggerModule.forRoot({
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
]
})

export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer)  {
    consumer.apply(JWTAuthMiddleware)
    .forRoutes(ProjectController)
  }
}
