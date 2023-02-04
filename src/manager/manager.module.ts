import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './entity/manager.entity';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  imports: [ 
    TypeOrmModule.forFeature([ManagerEntity]), NestjsWinstonLoggerModule.forRoot({
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

export class ManagerModule implements NestModule {
  configure(consumer: MiddlewareConsumer)  {
    consumer.apply(JWTAuthMiddleware)
    .forRoutes(ManagerController)
  }
}
