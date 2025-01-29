import { Module } from '@nestjs/common';
import { UserTestService } from './user_test.service';
import { UserTestController } from './user_test.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UserTestController],
  providers: [UserTestService],
  exports: [UserTestService],
})
export class UserTestModule {}
