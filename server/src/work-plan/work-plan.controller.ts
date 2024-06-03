import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { WorkPlanService } from './work-plan.service';
import { CreateWorkPlanDto } from './dto/create-work-plan.dto';
import { UpdateWorkPlanDto } from './dto/update-work-plan.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('work-plan')
@ApiTags('work-plan План работ в 1 отчёте, для 1 отчёта 1 workPlan')
export class WorkPlanController {
  constructor(private readonly workPlanService: WorkPlanService) {}

  @Post(':reportId')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async create(
    @Param('reportId') reportId: string,
    @Body() CreateWorkPlanDto: CreateWorkPlanDto,
  ) {
    return await this.workPlanService.create(+reportId, CreateWorkPlanDto);
  }

  @Get()
  @ApiQuery({
    name: 'reportId',
    type: Number,
    description: 'Id отчёта',
    required: false,
  })
  @Roles(Role.admin, Role.manager, Role.user)
  async findAll(@Query('reportId') reportId?: number) {
    return await this.workPlanService.findAll(+reportId);
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async findOne(@Param('id') id: string) {
    return await this.workPlanService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() UpdateWorkPlanDto: UpdateWorkPlanDto,
  ) {
    return await this.workPlanService.update(+id, UpdateWorkPlanDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async remove(@Param('id') id: string) {
    return await this.workPlanService.remove(+id);
  }
}
