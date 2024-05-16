import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { MainWorksNameService } from './main-works-name.service';
import { CreateMainWorksNameDto } from './dto/create-main-works-name.dto';
import { UpdateMainWorksNameDto } from './dto/update-main-works-name.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('main-works-name')
@ApiTags('main-works-name')

export class MainWorksNameController {
  constructor(private readonly mainWorksNameService: MainWorksNameService) {}

  @Post(':smetaId')
  @UsePipes(new ValidationPipe())
  async create(@Param('smetaId') smetaId: string, @Body() CreateMainWorksNameDto: CreateMainWorksNameDto) {
    return await this.mainWorksNameService.create(+smetaId, CreateMainWorksNameDto);
  }

  @Get()
  async findAll() {
    return await this.mainWorksNameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mainWorksNameService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() UpdateMainWorksNameDto: UpdateMainWorksNameDto) {
    return await this.mainWorksNameService.update(+id, UpdateMainWorksNameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mainWorksNameService.remove(+id);
  }
}
