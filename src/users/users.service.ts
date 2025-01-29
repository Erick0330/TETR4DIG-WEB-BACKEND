import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
import { UserTest } from 'src/user_test/entities/user_test.entity';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  onModuleInit() {
    this.$connect();
    console.log("Conectado");
  }

  async create(createUserDto: CreateUserDto) {

    return this.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        rol: createUserDto.rol,
        password: await bcryptjs.hash(createUserDto.password, 10)
      },
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.users.findUnique({
      where: {
        id
      }
    });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    return this.users.update({
      where: { id },
      data: {
        ...updateUserDto
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


    await this.userTests.deleteMany({
      where: {id_user: id}
    });
    
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

}

