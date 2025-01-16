import { Module } from '@nestjs/common';
import { UserTestService } from './user_test.service';
import { UserTestController } from './user_test.controller';

@Module({
  controllers: [UserTestController],
  providers: [UserTestService],
})
export class UserTestModule {}
