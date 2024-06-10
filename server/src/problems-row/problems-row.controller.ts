import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { ProblemsRowService } from './problems-row.service';
import { CreateProblemsRowDto } from './dto/create-problems-row.dto';
import { UpdateProblemsRowDto } from './dto/update-problems-row.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('problems-row')
@ApiTags('problems-row')
export class ProblemsRowController {
  constructor(private readonly problemsRowService: ProblemsRowService) {}

  @Post(':problemId')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async create(@Param('problemId') problemId: string, @Body() CreateProblemsRowDto: CreateProblemsRowDto) {
    return await this.problemsRowService.create(+problemId, CreateProblemsRowDto);
  }

  @Get()
  @Roles(Role.admin, Role.manager, Role.user)
  async findAll() {
    return await this.problemsRowService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async findOne(@Param('id') id: string) {
    return await this.problemsRowService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async update(@Req() request: Request,@Param('id') id: string, @Body() UpdateProblemsRowDto: UpdateProblemsRowDto) {
    return await this.problemsRowService.update(+id, UpdateProblemsRowDto, request);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async remove(@Req() request: Request,@Param('id') id: string) {
    return await this.problemsRowService.remove(+id, request);
  }
}
