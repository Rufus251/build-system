import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkPlanService } from './work-plan.service';
import { CreateWorkPlanDto } from './dto/create-work-plan.dto';
import { UpdateWorkPlanDto } from './dto/update-work-plan.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('work-plan')
@ApiTags('work-plan')

export class WorkPlanController {
  constructor(private readonly workPlanService: WorkPlanService) {}

  @Post(':reportId')
  @UsePipes(new ValidationPipe())
  async create(@Param('reportId') reportId: string, @Body() CreateWorkPlanDto: CreateWorkPlanDto) {
    return await this.workPlanService.create(+reportId, CreateWorkPlanDto);
  }

  @Get()
  async findAll() {
    return await this.workPlanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workPlanService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() UpdateWorkPlanDto: UpdateWorkPlanDto) {
    return await this.workPlanService.update(+id, UpdateWorkPlanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workPlanService.remove(+id);
  }
}
