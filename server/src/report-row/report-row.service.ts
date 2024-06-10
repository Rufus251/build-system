import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ReportRowService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly JwtService: JwtService,
  ) {}

  async checkRole(Req: Request) {
    const token = Req.headers['authorization'].split(' ')[1];
    const sign = this.JwtService.verify(token);
    const role = sign.role.toString();
    const login = sign.login.toString();
    return [role, login];
  }

  async checkTimeForUser(Req: Request, reportDate: Date) {
    const [role] = await this.checkRole(Req);
    if (role === 'user') {
      const nowDate = new Date();
      const difference = nowDate.getTime() - reportDate.getTime();
      const diffDay = difference / (1000 * 60 * 60 * 24);

      if (Math.abs(diffDay) >= 1) return false;
      else return true;
    } else return true;
  }

  async create(rowTypeId: number, workTypeId: number, dto: CreateReportRowDto) {
    try {
      let reportRow: any;
      if (dto.workType == 'main') {
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
      if (dto.rowType == 'fact') {
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

      // Изменение в смете
      console.log(reportRow.workType);
      
      if (reportRow.workType === 'main') {
        console.log("main", reportRow.MainWorksNameId, reportRow.factTotal);
        
        await this.databaseService.mainWorksName.update({
          where: {
            id: reportRow.MainWorksNameId,
          },
          data: {
            done: {
              increment: reportRow.factTotal,
            },
            left: {
              decrement: reportRow.factTotal,
            },
          },
        });
      } else if (reportRow.workType === 'additional') {
        console.log("addi");
        await this.databaseService.additionalWorksName.update({
          where: {
            id: reportRow.AdditionalWorksNameId,
          },
          data: {
            total: {
              increment: reportRow.factTotal,
            },
          },
        });
      }
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

  async update(id: number, dto: UpdateReportRowDto, request: Request) {
    try {
      const [role] = await this.checkRole(request);
      if (role === 'user') {
        const reportRow = await this.databaseService.reportRow.findUnique({
          where: {
            id,
          },
          include: {
            WorkDone: {
              select: {
                Report: {
                  select: {
                    workDate: true,
                  },
                },
              },
            },
            WorkPlan: {
              select: {
                Report: {
                  select: {
                    workDate: true,
                  },
                },
              },
            },
          },
        });

        const reportTime: Date =
          reportRow.rowType === 'fact'
            ? reportRow.WorkDone.Report.workDate
            : reportRow.WorkPlan.Report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }
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

  async remove(id: number, request: Request) {
    try {
      const [role] = await this.checkRole(request);
      if (role === 'user') {
        const reportRow = await this.databaseService.reportRow.findUnique({
          where: {
            id,
          },
          include: {
            WorkDone: {
              select: {
                Report: {
                  select: {
                    workDate: true,
                  },
                },
              },
            },
            WorkPlan: {
              select: {
                Report: {
                  select: {
                    workDate: true,
                  },
                },
              },
            },
          },
        });

        const reportTime: Date =
          reportRow.rowType === 'fact'
            ? reportRow.WorkDone.Report.workDate
            : reportRow.WorkPlan.Report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }
      const res = await this.databaseService.reportRow.delete({
        where: {
          id,
        },
      });

      // Изменение в смете
      if (res.workType === 'main') {
        await this.databaseService.mainWorksName.update({
          where: {
            id: res.MainWorksNameId,
          },
          data: {
            done: {
              decrement: res.factTotal,
            },
            left: {
              increment: res.factTotal,
            },
          },
        });
      } else if (res.workType === 'additional') {
        await this.databaseService.additionalWorksName.update({
          where: {
            id: res.AdditionalWorksNameId,
          },
          data: {
            total: {
              decrement: res.factTotal,
            },
          },
        });
      }
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
