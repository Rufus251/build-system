import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SmetaService } from 'src/smeta/smeta.service';
import { JsonObject } from '@prisma/client/runtime/library';
import * as Excel from 'exceljs';
import * as fs from 'fs';

@Injectable()
export class ReportService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
    private readonly smetaService: SmetaService,
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

  async create(dto: CreateReportDto, authorId: number, objectId: number) {
    try {
      const res = await this.databaseService.report.create({
        data: {
          ...dto,
          author: {
            connect: {
              id: authorId,
            },
          },
          object: {
            connect: {
              id: objectId,
            },
          },
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(
    ascending: string,
    objectId: number,
    username: string,
    dateStart: Date,
    dateEnd: Date,
    problems: boolean,
    additional: boolean,
    workType: string,
    worksNameId: number,
    role: string,
    login: string,
  ) {
    try {
      objectId = Number.isNaN(objectId) ? undefined : objectId;
      worksNameId = Number.isNaN(worksNameId) ? undefined : worksNameId;
      let query: Prisma.ReportFindManyArgs = {
        where: {
          objectId,
          author: {
            name: username,
          },
          workDate: {
            gte: dateStart,
            lte: dateEnd,
          },
          hasProblems: problems,
          hasAdditional: additional,
        },
        include: {
          workDone: {
            include: {
              rows: true,
            },
          },
          workPlan: {
            include: {
              rows: true,
            },
          },
          problems: {
            include: {
              ProblemsRow: true,
            },
          },
        },
      };

      // ascendind sort
      if (ascending === 'new') {
        query.orderBy = {
          workDate: 'desc',
        };
      } else if (ascending === 'old') {
        query.orderBy = {
          workDate: 'asc',
        };
      }

      // workType sort
      if (workType != undefined) {
        if (workType === 'fact' && worksNameId != undefined) {
          query.where = {
            ...query.where,
            workDone: {
              rows: {
                some: {
                  workDoneId: worksNameId,
                },
              },
            },
          };
        } else if (workType === 'plan' && worksNameId != undefined) {
          query.where = {
            ...query.where,
            workPlan: {
              rows: {
                some: {
                  WorkPlanId: worksNameId,
                },
              },
            },
          };
        }
      }

      // Юзер может просматривать отчёты только тех объектов, к которым привязан
      if (role === 'user') {
        const userId = await this.databaseService.user.findMany({
          where: {
            login,
          },
          select: {
            id: true,
          },
        })[0];
        const userObjects = await this.userService.findUserObjects(userId);
        console.log(userObjects);
        query.where = {
          ...query.where,
          AND: [
            {
              objectId: {
                in: userObjects,
              },
            },
            {
              objectId,
            },
          ],
        };
      }
      const res = await this.databaseService.report.findMany(query);

      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.report.findFirst({
        where: {
          id,
        },
        include: {
          workDone: {
            include: {
              rows: true,
            },
          },
          workPlan: {
            include: {
              rows: true,
            },
          },
          problems: {
            include: {
              ProblemsRow: true,
            },
          },
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findMyReports(id: number) {
    try {
      const res = await this.databaseService.report.findMany({
        where: {
          authorId: id,
        },
        include: {
          workDone: true,
          workPlan: true,
          problems: true,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createNewExcelFile(report: Object, filePath: string) {
    try {
      let workbook = new Excel.Workbook();

      let sheet = workbook.addWorksheet('report');
      // sheet.addRow(['Название', 'Единица измерения', 'Всего']);

      // Данные об объекте
      sheet.addRow([report['object']['name']]);
      sheet.addRow([report['object']['contractName']]);

      sheet.addRow([]);

      // Доп инфа
      const factDateArr: Array<string> = report['workDate']
        .toISOString()
        .slice(0, 10)
        .split('-');
      const factDateFinaly: string =
        factDateArr[2] + '/' + factDateArr[1] + '/' + factDateArr[0];
      sheet.addRow(['Дата производства работ: ', factDateFinaly]);
      sheet.addRow(['Погодные условия: ', report['weather']]);
      sheet.addRow(['Температура: ', report['temperature']]);
      sheet.addRow(['Кол-во рабочих на площадке: ', report['workersAmount']]);
      sheet.addRow(['Кол-во ИТР на площадке: ', report['ItrAmount']]);

      sheet.addRow([]);

      // Факт
      sheet.addRow(['Факт выполненных работ на: ' + factDateFinaly]);
      sheet.addRow([
        '№ п/п',
        'Наименование работ',
        'помещение (МОП / помещения / квартиры)',
        'ед.изм.',
        'Бригада',
        'Кол-во чел в бригаде',
        'ПЛАН Кол-во этажей',
        'ПЛАН Кол-во на 1 этаж',
        'ПЛАН Всего',
        'ФАКТ Кол-во этажей',
        'ФАКТ Кол-во на 1 этаж',
        'ФАКТ Всего',
        'Комментарии к заданиям / причина не выполнения плана',
      ]);

      // Строки факта
      let i: number = 1;
      for (const row of report['workDone']['rows']) {
        const workName: string =
          row['MainWorksName'] !== null
            ? row['MainWorksName']['name']
            : row['AdditionalWorksName']['name'];
        const unit: string =
          row['MainWorksName'] !== null
            ? row['MainWorksName']['unit']
            : row['AdditionalWorksName']['unit'];

        sheet.addRow([
          i,
          workName,
          row['room'],
          unit,
          row['brigade'],
          row['workersAmount'],
          row['planNumberOfFloor'],
          row['planQuantityPerFloor'],
          row['planTotal'],
          row['factNumberOfFloor'],
          row['factQuantityPerFloor'],
          row['factTotal'],
          row['comment'],
        ]);
        i += 1;
      }

      sheet.addRow([]);

      // План
      const planDate: Date = new Date(
        report['workDate'].getTime() + 1000 * 60 * 60 * 24,
      );
      const planDateArr: Array<string> = planDate
        .toISOString()
        .slice(0, 10)
        .split('-');
      const planDateFinaly: string =
        planDateArr[2] + '/' + planDateArr[1] + '/' + planDateArr[0];
      sheet.addRow(['План работ на: ' + planDateFinaly]);
      sheet.addRow([
        '№ п/п',
        'Наименование работ',
        'помещение (МОП / помещения / квартиры)',
        'ед.изм.',
        'Бригада',
        'Кол-во чел в бригаде',
        'ПЛАН Кол-во этажей',
        'ПЛАН Кол-во на 1 этаж',
        'ПЛАН Всего',
        'Комментарии к заданиям',
      ]);

      // Строки плана
      i = 1;
      for (const row of report['workPlan']['rows']) {
        const workName: string =
          row['MainWorksName'] !== null
            ? row['MainWorksName']['name']
            : row['AdditionalWorksName']['name'];
        const unit: string =
          row['MainWorksName'] !== null
            ? row['MainWorksName']['unit']
            : row['AdditionalWorksName']['unit'];

        sheet.addRow([
          i,
          workName,
          row['room'],
          unit,
          row['brigade'],
          row['workersAmount'],
          row['planNumberOfFloor'],
          row['planQuantityPerFloor'],
          row['planTotal'],
          row['comment'],
        ]);
        i += 1;
      }

      sheet.addRow([]);

      // Проблемные вопросы
      sheet.addRow(['Проблемные вопросы']);
      sheet.addRow(['№ п/п', 'Описание проблемы / вопроса', 'Принятые меры']);

      // Строки проблемных вопросов
      i = 1;
      for (const row of report['problems']['ProblemsRow']) {
        sheet.addRow([i, row['description'], row['takenMeasures']]);
        i += 1;
      }

      sheet.addRow([]);

      // Подготовил
      sheet.addRow(['Подготовил ООО "Д5 ИНЖИНИРИНГ":']);
      sheet.addRow([report['author']['name']]);
      sheet.addRow([report['author']['phone']]);

      sheet.getColumn('A').width = 30;
      sheet.getColumn('B').width = 30;
      sheet.getColumn('C').width = 30;
      sheet.getColumn('D').width = 12;
      sheet.getColumn('E').width = 15;
      sheet.getColumn('F').width = 12;
      sheet.getColumn('G').width = 12;
      sheet.getColumn('H').width = 12;
      sheet.getColumn('I').width = 12;
      sheet.getColumn('J').width = 12;
      sheet.getColumn('K').width = 12;
      sheet.getColumn('L').width = 12;
      sheet.getColumn('M').width = 30;

      await workbook.xlsx.writeFile(filePath);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async downloadXlsxReport(reportId: number) {
    try {
      const report: Object = await this.databaseService.report.findUnique({
        where: {
          id: reportId,
        },
        include: {
          author: {
            select: {
              name: true,
              phone: true,
            },
          },
          object: {
            select: {
              name: true,
              contractName: true,
            },
          },
          workDone: {
            include: {
              rows: {
                include: {
                  MainWorksName: {
                    select: {
                      name: true,
                      unit: true,
                    },
                  },
                  AdditionalWorksName: {
                    select: {
                      name: true,
                      unit: true,
                    },
                  },
                },
              },
            },
          },
          workPlan: {
            include: {
              rows: {
                include: {
                  MainWorksName: {
                    select: {
                      name: true,
                      unit: true,
                    },
                  },
                  AdditionalWorksName: {
                    select: {
                      name: true,
                      unit: true,
                    },
                  },
                },
              },
            },
          },
          problems: {
            include: {
              ProblemsRow: true,
            },
          },
        },
      });

      const filePath = './upload/report' + reportId + '.xlsx';

      await this.createNewExcelFile(report, filePath);
      const file = fs.createReadStream(filePath);
      return file;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: number, dto: UpdateReportDto, request: Request) {
    try {
      // Для юзера нельзя изменять позже чем через день
      const [role] = await this.checkRole(request);
      if (role === 'user') {
        const report = await this.databaseService.report.findUnique({
          where: {
            id,
          },
          select: {
            workDate: true,
          },
        });
        const reportTime: Date = report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }

      const res = await this.databaseService.report.update({
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
        const report = await this.databaseService.report.findUnique({
          where: {
            id,
          },
          select: {
            workDate: true,
          },
        });
        const reportTime: Date = report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }

      const res = await this.databaseService.report.delete({
        where: {
          id,
        },
        include: {
          object: {
            select: {
              smeta: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      // smeta update
      if (res.object.smeta.id)
        this.smetaService.updateSmeta(res.object.smeta.id);

      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
