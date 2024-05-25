import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkPlanService } from './work-plan.service';
import { CreateWorkPlanDto } from './dto/create-work-plan.dto';
import { UpdateWorkPlanDto } from './dto/update-work-plan.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';


@Controller('work-plan')
@ApiTags('work-plan')

export class WorkPlanController {
  constructor(private readonly workPlanService: WorkPlanService) {}

  @Post(':reportId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async create(@Param('reportId') reportId: string, @Body() CreateWorkPlanDto: CreateWorkPlanDto) {
    return await this.workPlanService.create(+reportId, CreateWorkPlanDto);
  }

  @Get()
  @Roles(Role.admin, Role.manager)
  async findAll() {
    return await this.workPlanService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.workPlanService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() UpdateWorkPlanDto: UpdateWorkPlanDto) {
    return await this.workPlanService.update(+id, UpdateWorkPlanDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.workPlanService.remove(+id);
  }
}
