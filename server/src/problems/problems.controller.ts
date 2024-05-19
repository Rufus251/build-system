import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('problems')
@ApiTags('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post(':reportId')
  @UsePipes(new ValidationPipe())
  async create(@Param('reportId') reportId: string, @Body() CreateProblemDto: CreateProblemDto) {
    return await this.problemsService.create(+reportId, CreateProblemDto);
  }

  @Get()
  async findAll() {
    return await this.problemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.problemsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateObjectDto: UpdateProblemDto) {
    return await this.problemsService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.problemsService.remove(+id);
  }
}
