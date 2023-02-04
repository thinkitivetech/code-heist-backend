import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthMiddleware } from 'src/security/JWTMiddleware';
import { TimeSheetController } from './time-sheet.controller';
import { TimeSheetEntity } from 'src/entities/timesheet.entity';
import { TimeSheetService } from './time-sheet.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entity/user.entity';
import { TimeSheetMapper } from './mapper/time-sheet.mapper';
import { TaskSheetEntity } from 'src/entities/taskTimeSheet.entity';
@Module({
    controllers: [TimeSheetController],
    providers: [TimeSheetService, TimeSheetMapper],
    imports: [
        TypeOrmModule.forFeature([TimeSheetEntity, UserEntity, TaskSheetEntity]), NestjsWinstonLoggerModule.forRoot({
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
        }), UserModule
    ]
})

export class TimeSheetModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JWTAuthMiddleware)
            .forRoutes(TimeSheetController)
    }
}
