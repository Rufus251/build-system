import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('report')
@ApiTags('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post(":authorId/:objectId")
  @UsePipes(new ValidationPipe())
  async create(@Param('authorId') authorId: string, @Param('objectId') objectId: string,@Body() createReportDto: CreateReportDto) {
    return await this.reportService.create(createReportDto, +authorId, +objectId);
  }

  @Get()
  async findAll() {
    return await this.reportService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportService.findOne(+id);
  }
  
  @Get('/myReports/:id')
  async findMyReports(@Param('id') id: string) {
    return await this.reportService.findMyReports(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return await this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reportService.remove(+id);
  }
}
