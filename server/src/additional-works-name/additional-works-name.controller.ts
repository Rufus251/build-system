import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdditionalWorksNameService } from './additional-works-name.service';
import { CreateAdditionalWorksNameDto } from './dto/create-additional-works-name.dto';
import { UpdateAdditionalWorksNameDto } from './dto/update-additional-works-name.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('additional-works-name')
@ApiTags('additional-works-name')

export class AdditionalWorksNameController {
  constructor(private readonly additionalWorksNameService: AdditionalWorksNameService) {}

  @Post(':smetaId')
  @UsePipes(new ValidationPipe())
  async create(@Param('smetaId') smetaId: string, @Body() CreateAdditionalWorksNameDto: CreateAdditionalWorksNameDto) {
    return await this.additionalWorksNameService.create(+smetaId, CreateAdditionalWorksNameDto);
  }

  @Get()
  async findAll() {
    return await this.additionalWorksNameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.additionalWorksNameService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() UpdateAdditionalWorksNameDto: UpdateAdditionalWorksNameDto) {
    return await this.additionalWorksNameService.update(+id, UpdateAdditionalWorksNameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.additionalWorksNameService.remove(+id);
  }
}
