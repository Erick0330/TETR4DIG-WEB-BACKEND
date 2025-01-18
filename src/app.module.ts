import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DimensionModule } from './dimension/dimension.module';
import { AmbitModule } from './ambit/ambit.module';
import { PerspectiveModule } from './perspective/perspective.module';
import { UserTestModule } from './user_test/user_test.module';

@Module({
  imports: [QuestionsModule, UsersModule, AuthModule, DimensionModule, AmbitModule, PerspectiveModule, UserTestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
