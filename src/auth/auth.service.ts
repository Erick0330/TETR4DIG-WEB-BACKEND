import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    async register({ name, email, password, rol }: RegisterDto) {

        const user = await this.usersService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('User already exist')
        }

        await this.usersService.create({
            name,
            email,
            rol,
            password: await bcryptjs.hash(password, 10)
        });

        return {
            name,
            email,
            rol
        }
    }

    async login({email, password}: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);

        if(!user)
            throw new NotFoundException(`No se encontro el usuario con el email ${email}`)

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid)
            throw new NotFoundException("La contraseña de este usuario es incorrecta");

        const payload = { email: user.email, rol: user.rol };

        const token = await this.jwtService.signAsync(payload);

        const rol = user.rol;
        
        return {
            token,
            email,
            rol,
        };
    }
}
