import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResidentialComplexService } from './residential-complex.service';
import { CreateResidentialComplexDto } from './dto/create-residential-complex.dto';
import { UpdateResidentialComplexDto } from './dto/update-residential-complex.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('residential-complex')
@ApiTags('residential-complex')
export class ResidentialComplexController {
  constructor(private readonly residentialComplexService: ResidentialComplexService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createResidentialComplexDto: CreateResidentialComplexDto) {
    return await this.residentialComplexService.create(createResidentialComplexDto);
  }

  @Get()
  async findAll() {
    return await this.residentialComplexService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.residentialComplexService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateResidentialComplexDto: UpdateResidentialComplexDto) {
    return await this.residentialComplexService.update(+id, updateResidentialComplexDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.residentialComplexService.remove(+id);
  }
}
