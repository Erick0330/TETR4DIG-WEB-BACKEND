import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuestionsService extends PrismaClient implements OnModuleInit {

  onModuleInit() {
    this.$connect();
    console.log("Conectado");
  }

  create(createQuestionDto: CreateQuestionDto) {
    return this.questions.create({
      data: createQuestionDto
    });
  }

  async findAll() {
    return await this.questions.findMany({
      where: {
        deleted: false
      }
    });
  }

  async findOne(id: number) {

    const question = await this.questions.findUnique({
      where: {
        id_question: id,
        deleted: false
      }
    });

    if (!question)
      throw new NotFoundException(`Question with id ${id} not found`);

    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {

    const question = await this.questions.findUnique({
      where: {
        id_question: id,
        deleted: false
      }
    });

    if (!question)
      throw new NotFoundException(`Question with id ${id} not found`);
    return this.questions.update({
      where: { id_question: id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {

    let question = await this.questions.findUnique({
      where: { id_question: id }
    });

    if (!question)
      throw new NotFoundException(`Question with id ${id} not found`);


    return this.questions.update({
      where: { id_question: id },
      data: {
        deleted: true
      },
    });
  }

  async findAllByIdDimension(id: number){

    return this.questions.findMany({
      where:{
        id_dimension: id,
        deleted: false
      }
    });
  }
}
