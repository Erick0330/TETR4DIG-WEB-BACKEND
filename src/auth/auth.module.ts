import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { UserTestModule } from 'src/user_test/user_test.module';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: envs.jwtConstants.secret,
      signOptions: { expiresIn: '1d'},
    }),
    UserTestModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
