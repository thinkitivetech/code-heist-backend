import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TimeSheetModule } from './time-sheet/time-sheet.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [UserModule,TimeSheetModule, LoginModule, ProjectModule, TypeOrmModule.forRootAsync(typeOrmConfigAsync), ConfigModule.forRoot()],
  providers: [AppService],

})
export class AppModule { }
