import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AmbitService } from './ambit.service';
import { CreateAmbitDto } from './dto/create-ambit.dto';
import { UpdateAmbitDto } from './dto/update-ambit.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('ambit')
@ApiTags('Ambits')
export class AmbitController {
  constructor(private readonly ambitService: AmbitService) { }

  @Post()
  @Auth('ADMIN')
  @ApiBearerAuth()
  create(@Body() createAmbitDto: CreateAmbitDto) {
    return this.ambitService.create(createAmbitDto);
  }

  @Get()
  findAll() {
    return this.ambitService.findAll();
  }

  @Get(':id')
  @Auth('ADMIN')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.ambitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateambitDto: UpdateAmbitDto) {
    return this.ambitService.update(+id, updateambitDto);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.ambitService.remove(+id);
  }


}
