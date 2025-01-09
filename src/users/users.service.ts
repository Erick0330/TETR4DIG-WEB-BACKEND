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

    if (createUserDto.rol === 'ADMIN' || createUserDto.rol === 'USER')
      return this.users.create({
        data: createUserDto
      });
    else
    throw new BadRequestException("El rol solo pude ser de tipo ADMIN o USER")
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
    return await this.users.findMany();
  }

  async findOne(id: number) {
    const user = await this.users.findUnique({
      where: {
        id
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
      data: updateUserDto,
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
      where: { id }
    })
  }

}
