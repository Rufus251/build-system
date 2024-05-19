import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProblemsRowService } from './problems-row.service';
import { CreateProblemsRowDto } from './dto/create-problems-row.dto';
import { UpdateProblemsRowDto } from './dto/update-problems-row.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('problems-row')
@ApiTags('problems-row')
export class ProblemsRowController {
  constructor(private readonly problemsRowService: ProblemsRowService) {}

  @Post(':problemId')
  @UsePipes(new ValidationPipe())
  async create(@Param('problemId') problemId: string, @Body() CreateProblemsRowDto: CreateProblemsRowDto) {
    return await this.problemsRowService.create(+problemId, CreateProblemsRowDto);
  }

  @Get()
  async findAll() {
    return await this.problemsRowService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.problemsRowService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() UpdateProblemsRowDto: UpdateProblemsRowDto) {
    return await this.problemsRowService.update(+id, UpdateProblemsRowDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.problemsRowService.remove(+id);
  }
}
