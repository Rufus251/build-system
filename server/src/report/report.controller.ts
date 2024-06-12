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
  Res,
  Req,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('report')
@ApiTags('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('create/:authorId/:objectId')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async create(
    @Param('authorId') authorId: string,
    @Param('objectId') objectId: string,
    @Body() createReportDto: CreateReportDto,
  ) {
    return await this.reportService.create(
      createReportDto,
      +authorId,
      +objectId,
    );
  }

  toBool(value: any) {
    if (typeof value === 'boolean') {
      return value;
    } else if (value === undefined) {
      return undefined;
    } else if (value.toString().toLowerCase() === 'false') {
      return false;
    } else if (value.toString().toLowerCase() === 'true') {
      return true;
    }
  }
  @Get()
  @ApiQuery({
    name: 'ascending',
    type: String,
    description:
      '("old/new") workDate, Сортировка отчётов по дате проведения работ (не создания), сначала старые или новые, без указания в порядке создания',
    required: false,
  })
  @ApiQuery({
    name: 'objectId',
    type: Number,
    description: 'id объекта',
    required: false,
  })
  @ApiQuery({
    name: 'username',
    type: String,
    description: 'ФИО работника',
    required: false,
  })
  @ApiQuery({
    name: 'dateStart',
    type: Date,
    description:
      'Дата от которой брать отчёты (например: Январь 2024, отчёты до 2024 (2022, 2023) показываться не будут)',
    required: false,
  })
  @ApiQuery({
    name: 'dateEnd',
    type: Date,
    description:
      'Дата до которой брать отчёты (например: Январь 2024, отчёты перед 2024 (2025, 2026) показываться не будут)',
    required: false,
  })
  @ApiQuery({
    name: 'problems',
    type: Boolean,
    description:
      'Без/c проблемными вопросами (оставить пустым чтобы не влияло)',
    required: false,
  })
  @ApiQuery({
    name: 'additional',
    type: Boolean,
    description:
      'Без/c дополнительными работами (оставить пустым чтобы не влияло)',
    required: false,
  })
  @ApiQuery({
    name: 'workType',
    type: String,
    description:
      '(fact/plan) Использовать вместе с worksNameId!!! Поиск отчёта, в котором есть строка с нужной работой. Например: в отчёте есть "залив опалубки" как основная работа',
    required: false,
  })
  @ApiQuery({
    name: 'worksNameId',
    type: Number,
    description:
      'Использовать вместе с workType!!! Поиск отчёта, в котором есть строка с нужной работой. Например: в отчёте есть "залив опалубки" как основная работа',
    required: false,
  })
  @Roles(Role.admin, Role.manager, Role.user)
  async findAll(
    @Req() request: Request,
    @Query('ascending') ascending?: string,
    @Query('objectId') objectId?: number,
    @Query('username') username?: string,
    @Query('dateStart') dateStart?: Date,
    @Query('dateEnd') dateEnd?: Date,
    @Query('problems') problems?: boolean,
    @Query('additional') additional?: boolean,
    @Query('workType') workType?: string,
    @Query('worksNameId') worksNameId?: number,
  ) {
    problems = this.toBool(problems);
    additional = this.toBool(additional);

    // get role for user sort
    const [role, login] = await this.reportService.checkRole(request);

    return await this.reportService.findAll(
      ascending,
      +objectId,
      username,
      dateStart,
      dateEnd,
      problems,
      additional,
      workType,
      +worksNameId,
      role,
      login,
    );
  }

  @Get('findOne/:id')
  @Roles(Role.admin, Role.manager, Role.user)
  async findOne(@Param('id') id: string) {
    return await this.reportService.findOne(+id);
  }

  @Get('/myReports/:id')
  @Roles(Role.admin, Role.manager, Role.user)
  async findMyReports(@Param('id') id: string) {
    return await this.reportService.findMyReports(+id);
  }

  @Get('downloadXlsxReport/:reportId')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename="report.xlsx"')
  @Roles(Role.admin, Role.manager)
  async uploadFile(@Param('reportId') reportId: string): Promise<StreamableFile> {
    const file = await this.reportService.downloadXlsxReport(+reportId);
    const streamFile = new StreamableFile(file);
    return streamFile;
  }

  @Patch('patch/:id')
  @Roles(Role.admin, Role.manager, Role.user)
  @UsePipes(new ValidationPipe())
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return await this.reportService.update(+id, updateReportDto, request);
  }

  @Delete('del/:id')
  @Roles(Role.admin, Role.manager, Role.user)
  async remove(@Req() request: Request, @Param('id') id: string) {
    return await this.reportService.remove(+id, request);
  }
}
