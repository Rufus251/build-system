import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SmetaService } from './smeta.service';
import { CreateSmetaDto } from './dto/create-smeta.dto';
import { UpdateSmetaDto } from './dto/update-smeta.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('smeta')
@ApiTags('smeta')
export class SmetaController {
  constructor(private readonly smetaService: SmetaService) {}

  @Post(':objectId')
  @UsePipes(new ValidationPipe())
  async create(@Param('objectId') objectId: string, @Body() createSmetaDto: CreateSmetaDto) {
    return await this.smetaService.create(+objectId, createSmetaDto);
  }

  @Get()
  async findAll() {
    return await this.smetaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.smetaService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateObjectDto: UpdateSmetaDto) {
    return await this.smetaService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.smetaService.remove(+id);
  }
}
