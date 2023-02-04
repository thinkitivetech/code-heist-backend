import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app.database.module';
import { UserService } from '../user.service';
import { UserRepoProviders } from './user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...UserRepoProviders,
    UserService,

  ],
})
export class UserRepositoryModule {}