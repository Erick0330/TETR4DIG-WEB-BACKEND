import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { CreateUserTestDto } from './dto/create-user_test.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserTestService extends PrismaClient implements OnModuleInit{

  onModuleInit() {
    this.$connect();
    console.log("Conectado");
  }

  async create(CreateUserTestDto: CreateUserTestDto){

    let ambitStr = '';
    let perspectiveStr = '';
    let dimensionStr = '';
    let cont: number = 0;

    // Calcular puntos de dimensiones
    const dimensions = await this.dimensions.findMany({
      where: { 
        deleted: false,
        questions_amount: {
          gt: 0
        }
      }
    });
    
    for (const dimension of dimensions) {
      const totalPoints = await this.questions.aggregate({
        where: { id_dimension: dimension.id_dimension,  deleted: false },
        _sum: { points: true },
      });
      await this.dimensions.update({
        where: { id_dimension: dimension.id_dimension},
        data: { points: totalPoints._sum.points || 0 },
      });

      if(cont > 0){
        dimensionStr += "\n"; 
      }
      cont += 1;

      let value = dimension.points / dimension.questions_amount;
      dimensionStr += dimension.name_dimension + "_" + value + "_" + (value / 4) * 100;
    }

    // Calcular puntos de perspectivas
    cont = 0;
    const perspectives = await this.perspectives.findMany({
      where: { 
        deleted: false,
        questions_amount: {
          gt: 0
        }
      }
    });

    for (const perspective of perspectives) {
      const totalPoints = await this.dimensions.aggregate({
        where: { id_perspective: perspective.id_perspective, deleted: false },
        _sum: { points: true },
      });
      await this.perspectives.update({
        where: { id_perspective: perspective.id_perspective, deleted: false },
        data: { points: totalPoints._sum.points || 0 },
      });

      if(cont > 0){
        perspectiveStr += "\n"; 
      }
      cont += 1;

      let value = perspective.points / perspective.questions_amount;
      perspectiveStr += perspective.perspective_name + "_" + value + "_" + (value / 4) * 100;      
    }

    // Calcular puntos de ambits
    cont = 0;
    const ambits = await this.ambits.findMany({
      where: { 
        delete: false,
        questions_amount: {
          gt: 0
        }
      }
    });

    for (const ambit of ambits) {
      const totalPoints = await this.perspectives.aggregate({
        where: { id_ambit: ambit.id_ambit, deleted: false},
        _sum: { points: true },
      });
      await this.ambits.update({
        where: { id_ambit: ambit.id_ambit },
        data: { points: totalPoints._sum.points || 0 },
      });

      if(cont > 0){
        ambitStr += "\n"; 
      }
      cont += 1;

      let value = ambit.points / ambit.questions_amount;
      ambitStr += ambit.ambit + "_" + value + "_" + (value / 4) * 100;
    }

    // Crear la entidad User_Test

    return this.userTests.create({
      data: {
        id_user: CreateUserTestDto.id_user,
        dimensions_result: dimensionStr,
        perspectives_result: perspectiveStr,
        ambits_result: ambitStr,
        testDate: new Date(),
      },
    });
  }

  async findAll(id: number) {
    return await this.userTests.findMany({
      where: { id_user: id}
    });
  }

  async findOne(id: number) {
    const user_test = await this.userTests.findUnique({
      where: {
        id: id,
      }
    });
        
    if (!user_test)
       throw new NotFoundException(`Dimension with id ${id} not found`);
        
    return user_test;
  }
}
