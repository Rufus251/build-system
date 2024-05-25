import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkDoneService } from './work-done.service';
import { CreateWorkDoneDto } from './dto/create-work-done.dto';
import { UpdateWorkDoneDto } from './dto/update-work-done.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('work-fact')
@ApiTags('work-fact')

export class WorkDoneController {
  constructor(private readonly workDoneService: WorkDoneService) {}

  @Post(':reportId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async create(@Param('reportId') reportId: string, @Body() CreateWorkDoneDto: CreateWorkDoneDto) {
    return await this.workDoneService.create(+reportId, CreateWorkDoneDto);
  }

  @Get()
  @Roles(Role.admin, Role.manager)
  async findAll() {
    return await this.workDoneService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.workDoneService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() UpdateWorkDoneDto: UpdateWorkDoneDto) {
    return await this.workDoneService.update(+id, UpdateWorkDoneDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.workDoneService.remove(+id);
  }
}
