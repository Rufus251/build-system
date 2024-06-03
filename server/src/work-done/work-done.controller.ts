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
import { WorkDoneService } from './work-done.service';
import { CreateWorkDoneDto } from './dto/create-work-done.dto';
import { UpdateWorkDoneDto } from './dto/update-work-done.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('work-fact')
@ApiTags('work-fact Факт работ в 1 отчёте, для 1 отчёта 1 workDone')
export class WorkDoneController {
  constructor(private readonly workDoneService: WorkDoneService) {}

  @Post(':reportId')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async create(
    @Param('reportId') reportId: string,
    @Body() CreateWorkDoneDto: CreateWorkDoneDto,
  ) {
    return await this.workDoneService.create(+reportId, CreateWorkDoneDto);
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
    return await this.workDoneService.findAll(+reportId);
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async findOne(@Param('id') id: string) {
    return await this.workDoneService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() UpdateWorkDoneDto: UpdateWorkDoneDto,
  ) {
    return await this.workDoneService.update(+id, UpdateWorkDoneDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async remove(@Param('id') id: string) {
    return await this.workDoneService.remove(+id);
  }
}
