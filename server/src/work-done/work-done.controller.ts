import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkDoneService } from './work-done.service';
import { CreateWorkDoneDto } from './dto/create-work-done.dto';
import { UpdateWorkDoneDto } from './dto/update-work-done.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('work-fact')
@ApiTags('work-fact')

export class WorkDoneController {
  constructor(private readonly workDoneService: WorkDoneService) {}

  @Post(':reportId')
  @UsePipes(new ValidationPipe())
  async create(@Param('reportId') reportId: string, @Body() CreateWorkDoneDto: CreateWorkDoneDto) {
    return await this.workDoneService.create(+reportId, CreateWorkDoneDto);
  }

  @Get()
  async findAll() {
    return await this.workDoneService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workDoneService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() UpdateWorkDoneDto: UpdateWorkDoneDto) {
    return await this.workDoneService.update(+id, UpdateWorkDoneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workDoneService.remove(+id);
  }
}
