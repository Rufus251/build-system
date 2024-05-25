import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportRowService } from './report-row.service';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import { ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('report-row')
@ApiTags('report-row')
export class ReportRowController {
  constructor(private readonly reportRowService: ReportRowService) { }

  // main/additional id +  fact/plan id 
  @Post(':workTypeId/:rowTypeId')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async create(@Param('workTypeId') workTypeId: string, @Param('rowTypeId') rowTypeId: string,  @Body() createReportRowDto: CreateReportRowDto) {
    return await this.reportRowService.create(+workTypeId, +rowTypeId, createReportRowDto);
  }

  @Get()
  @Roles(Role.admin, Role.manager, Role.user)
  async findAll() {
    return await this.reportRowService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async findOne(@Param('id') id: string) {
    return await this.reportRowService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateReportRowDto: UpdateReportRowDto) {
    return await this.reportRowService.update(+id, updateReportRowDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async remove(@Param('id') id: string) {
    return await this.reportRowService.remove(+id);
  }
}
