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
} from '@nestjs/common';
import { ReportRowService } from './report-row.service';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import { ApiHeader, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('report-row')
@ApiTags('report-row')
export class ReportRowController {
  constructor(private readonly reportRowService: ReportRowService) {}

  // main/additional id +  fact/plan id
  @Post(':workTypeId/:rowTypeId')
  @ApiParam({
    name: 'workTypeId',
    description:
      '(main/additional) нужен id конкреной работы одной из этих типов работ. Тип работ указывается в теле запроса. Например: дополнительная работа с id 4. В теле запроса указываете additional, в этом поле указываете 4.',
  })
  @ApiParam({
    name: 'rowTypeId',
    description:
      '(fact/plan) нужен id типа строки. Тип работ указывается в теле запроса. Например: строка должна входить в план отчёта, план отчёта под id 4. В теле запроса указываете plan, в этом поле указываете 4',
  })
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async create(
    @Param('workTypeId') workTypeId: string,
    @Param('rowTypeId') rowTypeId: string,
    @Body() createReportRowDto: CreateReportRowDto,
  ) {
    return await this.reportRowService.create(
      +workTypeId,
      +rowTypeId,
      createReportRowDto,
    );
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
  async update(
    @Param('id') id: string,
    @Body() updateReportRowDto: UpdateReportRowDto,
  ) {
    return await this.reportRowService.update(+id, updateReportRowDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager, Role.user)
  async remove(@Param('id') id: string) {
    return await this.reportRowService.remove(+id);
  }
}
