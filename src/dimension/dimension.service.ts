import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateDimensionDto } from './dto/create-dimension.dto';
import { UpdateDimensionDto } from './dto/update-dimension.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DimensionService extends PrismaClient implements OnModuleInit {
  
  onModuleInit() {
    this.$connect();
    console.log("Conectado");
  }
  
  create(createDimensionDto: CreateDimensionDto) {
    return this.dimensions.create({
      data: createDimensionDto
    });
  }

  async findAll() {
    return await this.dimensions.findMany({
      where: { deleted: false}
    });
  }

  async findOne(id: number) {

    const dimension = await this.dimensions.findUnique({
          where: {
            id_dimension: id,
            deleted: false
          }
        });
    
        if (!dimension)
          throw new NotFoundException(`Dimension with id ${id} not found`);
    
        return dimension;
  }

  async update(id: number, updateDimensionDto: UpdateDimensionDto) {
    
    const dimension = await this.dimensions.findUnique({
      where: {
        id_dimension: id,
        deleted: false
      }
    });

    if (!dimension)
      throw new NotFoundException(`Dimension with id ${id} not found`);

    return this.dimensions.update({
      where: { id_dimension: id },
      data: updateDimensionDto,
    });
  }

  async remove(id: number) {
    
    let dimension = await this.dimensions.findUnique({
      where: { id_dimension: id }
    });

    if (!dimension)
      throw new NotFoundException(`Dimension with id ${id} not found`);


    return this.dimensions.update({
      where: { id_dimension: id },
      data: {
        deleted: true
      },
    });
  }

  async findAllByIdPerspective(id: number){

    return this.dimensions.findMany({
      where:{
        id_perspective: id,
        deleted: false
      }
    });
  }
}
