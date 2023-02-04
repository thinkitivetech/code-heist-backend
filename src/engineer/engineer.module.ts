import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EngineerController } from './engineer.controller';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { EngineerService } from './engineer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
import { EngineerEntity } from 'src/entities/engineer.entity';
@Module({
  controllers: [EngineerController],
  providers: [EngineerService],
  imports: [ 
    TypeOrmModule.forFeature([EngineerEntity]), NestjsWinstonLoggerModule.forRoot({
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

export class EngineerModule implements NestModule {
  configure(consumer: MiddlewareConsumer)  {
    consumer.apply(JWTAuthMiddleware)
    .forRoutes(EngineerController)
  }
}
