import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PerspectiveService } from './perspective.service';
import { CreatePerspectiveDto } from './dto/create-perspective.dto';
import { UpdatePerspectiveDto } from './dto/update-perspective.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('perspective')
@ApiTags('Perspectives')
export class PerspectiveController {
  constructor(private readonly perspectiveService: PerspectiveService) { }

  @Post()
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  create(@Body() createPerspectiveDto: CreatePerspectiveDto) {
    return this.perspectiveService.create(createPerspectiveDto);
  }

  @Get()
  findAll() {
    return this.perspectiveService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.perspectiveService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePerspectiveDto: UpdatePerspectiveDto) {
    return this.perspectiveService.update(+id, updatePerspectiveDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.perspectiveService.remove(+id);
  }
}