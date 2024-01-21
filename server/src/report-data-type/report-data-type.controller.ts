import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportDataTypeService } from './report-data-type.service';
import { CreateReportDataTypeDto } from './dto/create-report-data-type.dto';
import { UpdateReportDataTypeDto } from './dto/update-report-data-type.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('report-data-type')
@ApiTags('report-data-type')
export class ReportDataTypeController {
  constructor(private readonly reportDataTypeService: ReportDataTypeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createReportDataTypeDto: CreateReportDataTypeDto) {
    return await this.reportDataTypeService.create(createReportDataTypeDto);
  }

  @Get()
  async findAll() {
    return await this.reportDataTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportDataTypeService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateReportDataTypeDto: UpdateReportDataTypeDto) {
    return await this.reportDataTypeService.update(+id, updateReportDataTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reportDataTypeService.remove(+id);
  }
}
