import { Logger, Module } from '@nestjs/common';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { format, transports } from 'winston';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  imports: [UserModule, TypeOrmModule.forRootAsync(typeOrmConfigAsync), ConfigModule.forRoot()],
  providers: [AppService],

})
export class AppModule { }
