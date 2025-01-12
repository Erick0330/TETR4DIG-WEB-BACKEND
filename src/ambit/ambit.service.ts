import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateAmbitDto } from './dto/create-ambit.dto';
import { UpdateAmbitDto } from './dto/update-ambit.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AmbitService extends PrismaClient implements OnModuleInit {

  onModuleInit() {
    this.$connect();
    console.log("Conectado");
  }

  create(createAmbitDto: CreateAmbitDto) {
    return this.ambits.create({
      data: createAmbitDto
    });
  }

  async findAll() {
    return await this.ambits.findMany({
      where: { delete: false}
    });
  }

  async findOne(id: number) {

    const ambit = await this.ambits.findUnique({
      where: {
        id_ambit: id,
        delete: false
      }
    });


    if (!ambit)
      throw new NotFoundException(`Ambit with id ${id} not found`);

    return ambit;
  }

  async update(id: number, updateAmbitDto: UpdateAmbitDto) {

    const ambit = await this.ambits.findUnique({
      where: {
        id_ambit: id,
        delete: false
      }
    });

    if (!ambit)
      throw new NotFoundException(`Ambit with id ${id} not found`);

    return this.ambits.update({
      where: { id_ambit: id },
      data: updateAmbitDto,
    });
  }

  async remove(id: number) {

    let ambit = await this.ambits.findUnique({
      where: { id_ambit: id }
    });

    if (!ambit)
      throw new NotFoundException(`Ambit with id ${id} not found`);


    return this.ambits.update({
      where: { id_ambit: id },
      data: {
        delete: true
      },
    });
  }
}
