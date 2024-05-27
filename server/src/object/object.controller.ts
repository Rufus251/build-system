import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('object')
@ApiTags('object')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  @Post(':complexId/:userId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async create(
    @Param('complexId') complexId: string,
    @Body() createObjectDto: CreateObjectDto,
  ) {
    return await this.objectService.create(+complexId, createObjectDto);
  }

  @Get()
  @ApiQuery({
    name: 'complexId',
    type: Number,
    description: 'Id жилого комплекса, к которому привязан объект',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: 'Получение названий объектов, которые привязаны к определённому юзеру',
    required: false,
  })
  @ApiQuery({
    name: 'objectName',
    type: String,
    description: 'Название объекта',
    required: false,
  })
  @Roles(Role.admin, Role.manager)
  async findAll(@Query('complexId') complexId?: string, @Query('userId') userId?: string, @Query('objectName') objectName?: string) {
    return await this.objectService.findAll(+complexId, +userId, objectName);
  }

  @Get('names')
  @ApiQuery({
    name: 'complexId',
    type: Number,
    description: 'Id жилого комплекса, к которому привязан объект',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: 'Получение названий объектов, которые привязаны к определённому юзеру',
    required: false,
  })
  @ApiQuery({
    name: 'objectName',
    type: String,
    description: 'Название объекта',
    required: false,
  })
  @Roles(Role.admin, Role.manager)
  async findAllNames(@Query('complexId') complexId?: string, @Query('userId') userId?: string, @Query('objectName') objectName?: string) {
    return await this.objectService.findAllNames(+complexId, +userId, objectName);
  }

  @Get('ObjectOnUsers')
  @Roles(Role.admin, Role.manager)
  async findOOU() {
    return await this.objectService.findOOU();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.objectService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateObjectDto: UpdateObjectDto,
  ) {
    return await this.objectService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.objectService.remove(+id);
  }
}
