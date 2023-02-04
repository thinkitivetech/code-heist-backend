import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ TypeOrmModule.forFeature([User]), NestjsWinstonLoggerModule.forRoot({
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
  }),
],
})
export class UserModule {}
