import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TeamLeadController } from './team-lead.controller';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { TeamLeadService } from './team-lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLeadEntity } from './entity/teamLead.entity';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
@Module({
  controllers: [TeamLeadController],
  providers: [TeamLeadService],
  imports: [ 
    TypeOrmModule.forFeature([TeamLeadEntity]), NestjsWinstonLoggerModule.forRoot({
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

export class TeamLeadModule implements NestModule {
  configure(consumer: MiddlewareConsumer)  {
    consumer.apply(JWTAuthMiddleware)
    .forRoutes(TeamLeadController)
  }
}
