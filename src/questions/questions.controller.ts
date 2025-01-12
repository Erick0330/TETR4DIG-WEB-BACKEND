import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @Auth('ADMIN')
  @ApiBearerAuth()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @Auth('ADMIN')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @Auth('ADMIN')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {


    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
