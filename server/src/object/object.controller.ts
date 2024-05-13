import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('object')
@ApiTags('object')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) { }

  @Post(':complexId/:userId')
  @UsePipes(new ValidationPipe())
  async create(@Param('complexId') complexId: string, @Param('userId') userId: string, @Body() createObjectDto: CreateObjectDto) {
    return await this.objectService.create(+complexId, +userId, createObjectDto);
  }

  @Get()
  async findAll() {
    return await this.objectService.findAll();
  }
  
  @Get('ObjectOnUsers')
  async findOOU() {
    return await this.objectService.findOOU();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.objectService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateObjectDto: UpdateObjectDto) {
    return await this.objectService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.objectService.remove(+id);
  }


}
