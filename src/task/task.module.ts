import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsWinstonLoggerModule } from "nestjs-winston-logger";
import { TaskSheetEntity } from "src/entities/taskTimeSheet.entity";
import { format, transports } from "winston";
import { TaskService } from "./task.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskSheetEntity]),
    NestjsWinstonLoggerModule.forRoot({
      format: format.combine(
        format.timestamp({ format: "isoDateTime" }),
        format.json(),
        format.colorize({ all: true })
      ),
      transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),
        new transports.Console(),
      ],
    }),
  ],
  providers: [TaskService],
})
export class TaskModule {}
