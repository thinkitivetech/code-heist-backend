import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
import { LoginModule } from 'src/login/login.module';
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
  })
],
exports: [UserService],

})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer)  {
    consumer.apply(JWTAuthMiddleware)
    .forRoutes(UserController)
  }
}