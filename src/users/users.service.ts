import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  onModuleInit() {
    this.$connect();
    console.log("Conectado");
  }

  create(createUserDto: CreateUserDto) {

    return this.users.create({
      data: createUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        rol: true
      }
    });

  }

  async findOneByEmail(email: string) {
    const user = this.users.findFirst({
      where: { email }
    })

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findAll() {
    return await this.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        rol: true,
        current: true,
      }
    });
  }

  async findOne(id: number) {
    const user = await this.users.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        rol: true
      }
    });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, current?: boolean) {
    const user = await this.users.findUnique({
      where: {
        id
      }
    });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    if (!current) {
      current = false;
    }
    return this.users.update({
      where: { id },
      data: {
        ...updateUserDto,
        current: current
      },
      select: {
        id: true,
        name: true,
        email: true,
        rol: true
      }
    });
  }

  async remove(id: number) {

    const user = await this.users.findUnique({
      where: {
        id
      }
    });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    return this.users.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        rol: true
      }
    })
  }

  async getCurrentUserName() {
    const u = await this.users.findMany();
    for (let i = 0; i < u.length; i++) {
      if (u[i].current) {
        console.log(u[i].rol)
        return {
          name: u[i].name,
          rol: u[i].rol
        };
      }
    }

    throw new BadRequestException('No hay nignun usuario activo');

  }
}

