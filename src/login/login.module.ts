import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format } from 'path';
import { DatabaseModule } from 'src/app.database.module';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    controllers: [LoginController],
    providers: [LoginService],
    imports: [UserModule]
})
export class LoginModule { }
