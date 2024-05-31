import { Injectable } from '@nestjs/common';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportRowService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(rowTypeId: number, workTypeId: number, dto: CreateReportRowDto) {
    try {
      let reportRow: any;
      console.log(dto.workType == 'main');
      if (dto.workType == 'main') {
        console.log(1);
        reportRow = await this.databaseService.reportRow.create({
          data: {
            ...dto,
            MainWorksName: {
              connect: {
                id: rowTypeId,
              },
            },
          },
        });
      } else if (dto.workType == 'additional') {
        console.log(2);
        reportRow = await this.databaseService.reportRow.create({
          data: {
            ...dto,
            AdditionalWorksName: {
              connect: {
                id: rowTypeId,
              },
            },
          },
        });
      }
      console.log(dto.rowType);
      if (dto.rowType == 'fact') {
        console.log(3);
        await this.databaseService.reportRow.update({
          where: {
            id: reportRow.id,
          },
          data: {
            WorkDone: {
              connect: {
                id: workTypeId,
              },
            },
          },
        });
      } else if (dto.rowType == 'plan') {
        console.log(4);
        await this.databaseService.reportRow.update({
          where: {
            id: reportRow.id,
          },
          data: {
            WorkPlan: {
              connect: {
                id: workTypeId,
              },
            },
          },
        });
      }
      reportRow = await this.databaseService.reportRow.findFirst({
        where: {
          id: reportRow.id,
        },
      });
      return reportRow;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(
    reportId: number,
    rowType: string,
    workId: number,
    workType: string,
    workTypeId: number,
  ) {
    try {
      reportId = Number.isNaN(reportId) ? undefined : reportId;
      workId = Number.isNaN(workId) ? undefined : workId;
      workTypeId = Number.isNaN(workTypeId) ? undefined : workTypeId;

      // Сортировка на workId, workTypeId
      let query: Prisma.ReportRowFindManyArgs = {
        where: {
          workType,
          rowType,
          AND: [
            {
              OR: [
                {
                  workDoneId: workId,
                },
                {
                  WorkPlanId: workId,
                },
              ],
            },
            {
              OR: [
                {
                  MainWorksNameId: workTypeId,
                },
                {
                  AdditionalWorksNameId: workTypeId,
                },
              ],
            },
          ],
        },
      };

      // Сортировка на reportId
      if (reportId !== undefined) {
        query.where = {
          ...query.where,
          OR: [
            {
              WorkPlan: {
                reportId,
              },
            },
            {
              WorkDone: {
                reportId,
              },
            },
          ],
        };
      }
      const res = await this.databaseService.reportRow.findMany(query);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.reportRow.findFirst({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: number, dto: UpdateReportRowDto) {
    try {
      const res = await this.databaseService.reportRow.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async remove(id: number) {
    try {
      const res = await this.databaseService.reportRow.delete({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
