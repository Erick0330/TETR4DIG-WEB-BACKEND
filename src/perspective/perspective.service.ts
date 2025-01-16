import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePerspectiveDto } from './dto/create-perspective.dto';
import { UpdatePerspectiveDto } from './dto/update-perspective.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PerspectiveService extends PrismaClient implements OnModuleInit {

  onModuleInit() {
    this.$connect();
    console.log("Conectado");
  }


  create(createPerspectiveDto: CreatePerspectiveDto) {
    return this.perspectives.create({
      data: createPerspectiveDto
    });
  }

  async findAll() {
    return await this.perspectives.findMany({
      where: { deleted: false }
    });
  }

  async findOne(id: number) {

    const perspective = await this.perspectives.findUnique({
      where: {
        id_perspective: id,
        deleted: false
      }
    });

    if (!perspective)
      throw new NotFoundException(`Perspective with id ${id} not found`);
    return perspective;
  }

  async update(id: number, updatePerspectiveDto: UpdatePerspectiveDto) {

    const perspective = await this.perspectives.findUnique({
      where: {
        id_perspective: id,
        deleted: false
      }
    });

    if (!perspective)
      throw new NotFoundException(`Perpsective with id ${id} not found`);
    return this.perspectives.update({
      where: {
        id_perspective: id,
        deleted: false
      },
      data: updatePerspectiveDto,
    });
  }

  async remove(id: number) {

    const perspective = await this.perspectives.findUnique({
      where: { id_perspective: id }
    });

    if (!perspective)
      throw new NotFoundException(`Perspective with id ${id} not found`);

    return this.perspectives.update({
      where: { id_perspective: id },
      data: {
        deleted: true
      },
    });
  }

  async findAllByIdAmbit(id: number) {

    const array = this.perspectives.findMany({
      where: {
        id_ambit: id,
        deleted: false
      }
    });

    return this.perspectives.findMany({
      where: {
        id_ambit: id,
        deleted: false
      }
    });
  }
}
