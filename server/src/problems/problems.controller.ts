import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('problems')
@ApiTags('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post(':reportId')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async create(@Param('reportId') reportId: string, @Body() CreateProblemDto: CreateProblemDto) {
    return await this.problemsService.create(+reportId, CreateProblemDto);
  }

  @Get()
  @Roles(Role.admin, Role.manager, Role.user)
  async findAll() {
    return await this.problemsService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async findOne(@Param('id') id: string) {
    return await this.problemsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async update(@Req() request: Request,@Param('id') id: string, @Body() updateObjectDto: UpdateProblemDto) {
    return await this.problemsService.update(+id, updateObjectDto, request);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async remove(@Req() request: Request,@Param('id') id: string) {
    return await this.problemsService.remove(+id, request);
  }
}
