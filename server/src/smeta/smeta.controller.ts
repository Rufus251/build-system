import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SmetaService } from './smeta.service';
import { CreateSmetaDto } from './dto/create-smeta.dto';
import { UpdateSmetaDto } from './dto/update-smeta.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('smeta')
@ApiTags('smeta')
export class SmetaController {
  constructor(private readonly smetaService: SmetaService) {}

  @Post(':objectId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async create(@Param('objectId') objectId: string, @Body() createSmetaDto: CreateSmetaDto) {
    return await this.smetaService.create(+objectId, createSmetaDto);
  }

  @Get()
  @Roles(Role.admin, Role.manager)
  async findAll() {
    return await this.smetaService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.smetaService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateObjectDto: UpdateSmetaDto) {
    return await this.smetaService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.smetaService.remove(+id);
  }
}
