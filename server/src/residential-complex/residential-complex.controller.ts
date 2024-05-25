import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResidentialComplexService } from './residential-complex.service';
import { CreateResidentialComplexDto } from './dto/create-residential-complex.dto';
import { UpdateResidentialComplexDto } from './dto/update-residential-complex.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('residential-complex')
@ApiTags('residential-complex')
export class ResidentialComplexController {
  constructor(private readonly residentialComplexService: ResidentialComplexService) {}

  @Post()
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async create(@Body() createResidentialComplexDto: CreateResidentialComplexDto) {
    return await this.residentialComplexService.create(createResidentialComplexDto);
  }

  @Get()
  @Roles(Role.admin, Role.manager)
  async findAll() {
    return await this.residentialComplexService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.residentialComplexService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateResidentialComplexDto: UpdateResidentialComplexDto) {
    return await this.residentialComplexService.update(+id, updateResidentialComplexDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.residentialComplexService.remove(+id);
  }
}
