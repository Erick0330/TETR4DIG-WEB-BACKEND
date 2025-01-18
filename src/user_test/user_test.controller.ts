import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTestService } from './user_test.service';
import { CreateUserTestDto } from './dto/create-user_test.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user-test')
@ApiTags('UserTests')
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}

  @Post()
  create(@Body() createUserTestDto: CreateUserTestDto) {
    return this.userTestService.create(createUserTestDto);
  }

  @Get('findAll/:id')
  findAll(@Param('id') id: string) {
    return this.userTestService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTestService.findOne(+id);
  }
}
