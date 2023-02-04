import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  NestjsWinstonLoggerService,
  appendRequestIdToLogger,
  LoggingInterceptor,
  morganRequestLogger,
  morganResponseLogger,
  appendIdToRequest
} from 'nestjs-winston-logger';
import { AppModule } from './app.module';
import { format, transports } from 'winston';
import helmet from 'helmet';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalLogger = new NestjsWinstonLoggerService({
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
  });
  app.useLogger(globalLogger);
  app.use(helmet());
  // append id to identify request
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));
  app.use(passport.initialize());
  app.use(morganRequestLogger(globalLogger));
  app.use(morganResponseLogger(globalLogger));
  app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
