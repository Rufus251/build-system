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
import { ReportRowService } from './report-row.service';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import {
  ApiHeader,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'reportId',
    type: String,
    description: 'id отчёта к которому привязана строка',
    required: false,
  })
  @ApiQuery({
    name: 'rowType',
    type: String,
    description: 'Строка находится в fact или plan в отчёте',
    required: false,
  })
  @ApiQuery({
    name: 'workId',
    type: Number,
    description:
      'id работы к которой привязана строка (без rowType будет искать и в plan и в fact)',
    required: false,
  })
  @ApiQuery({
    name: 'workType',
    type: String,
    description: '(main / additional) Работа из сметы, к которой принадлежит строка',
    required: false,
  })
  @ApiQuery({
    name: 'workTypeId',
    type: Number,
    description:
      'id работы из сметы, (без workType будет искать и в main и в additional)',
    required: false,
  })
  @Roles(Role.admin, Role.manager, Role.user)
  async findAll(
    @Query('reportId') reportId?: number,
    @Query('rowType') rowType?: string,
    @Query('workId') workId?: number,
    @Query('workType') workType?: string,
    @Query('workTypeId') workTypeId?: number,
  ) {
    return await this.reportRowService.findAll(
      +reportId,
      rowType,
      +workId,
      workType,
      +workTypeId,
    );
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
