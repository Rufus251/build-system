import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('object')
@ApiTags('object')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  @Post(':complexId')
  async create(@Param('complexId') complexId: string, @Body() createObjectDto: CreateObjectDto) {
    return await this.objectService.create(+complexId, createObjectDto);
  }

  @Get()
  async findAll() {
    return await this.objectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.objectService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateObjectDto: UpdateObjectDto) {
    return await this.objectService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.objectService.remove(+id);
  }
}
