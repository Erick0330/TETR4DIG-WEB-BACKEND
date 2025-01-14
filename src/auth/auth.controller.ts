import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { ApiTags } from '@nestjs/swagger';

// interface RequestWithUser extends Request {
//     user: {
//         email: string;
//         rol: string;
//     }
// }

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(
        @Body() loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(
        @Body() registerDto: RegisterDto
    ) {
        return this.authService.register(registerDto);
    }


}
