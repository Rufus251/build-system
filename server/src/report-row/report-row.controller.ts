import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportRowService } from './report-row.service';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import { ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('report-row')
@ApiTags('report-row')
export class ReportRowController {
  constructor(private readonly reportRowService: ReportRowService) { }

  // main/additional id +  fact/plan id 
  @Post(':workTypeId/:rowTypeId')
  @UsePipes(new ValidationPipe())
  async create(@Param('workTypeId') workTypeId: string, @Param('rowTypeId') rowTypeId: string,  @Body() createReportRowDto: CreateReportRowDto) {
    return await this.reportRowService.create(+workTypeId, +rowTypeId, createReportRowDto);
  }

  @Get()
  async findAll() {
    return await this.reportRowService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportRowService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateReportRowDto: UpdateReportRowDto) {
    return await this.reportRowService.update(+id, updateReportRowDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reportRowService.remove(+id);
  }
}
