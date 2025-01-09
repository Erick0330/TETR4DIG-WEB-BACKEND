import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DimensionService } from './dimension.service';
import { CreateDimensionDto } from './dto/create-dimension.dto';
import { UpdateDimensionDto } from './dto/update-dimension.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('dimension')
@ApiTags('Dimensions')
export class DimensionController {
  constructor(private readonly dimensionService: DimensionService) { }

  @Post()
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  create(@Body() createDimensionDto: CreateDimensionDto) {
    return this.dimensionService.create(createDimensionDto);
  }

  @Get()
  findAll() {
    return this.dimensionService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.dimensionService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateDimensionDto: UpdateDimensionDto) {
    return this.dimensionService.update(+id, updateDimensionDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.dimensionService.remove(+id);
  }
}
