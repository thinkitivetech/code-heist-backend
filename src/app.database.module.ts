import { Module } from '@nestjs/common';
import { databaseProviders } from './app.database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}