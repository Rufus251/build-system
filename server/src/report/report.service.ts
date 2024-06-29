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
    complexId: number,
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
      complexId = Number.isNaN(complexId) ? undefined : complexId;
      objectId = Number.isNaN(objectId) ? undefined : objectId;
      worksNameId = Number.isNaN(worksNameId) ? undefined : worksNameId;
      let query: Prisma.ReportFindManyArgs = {
        where: {
          objectId,
          object: {
            residentialComplexId: complexId,
          },
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
          object: {
            select: {
              residentialComplexId: true,
            },
          },
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

  protected additionalInfoSetStyles(sheet: any, rowNumber: number) {
    sheet.getCell(`A${rowNumber}`).border = {
      top: { style: 'thin', color: { argb: '00000000' } },
    };
    sheet.getCell(`A${rowNumber}`).font = {
      name: 'Arial Narrow',
      size: 11,
      bold: true,
    };
    sheet.getCell(`A${rowNumber}`).alignment = {
      horizontal: 'right',
      vertical: 'middle',
    };

    sheet.mergeCells(`B${rowNumber}`, `C${rowNumber}`);
    sheet.getCell(`B${rowNumber}`).border = {
      top: { style: 'thin', color: { argb: '00000000' } },
    };
    sheet.getCell(`B${rowNumber}`).font = {
      name: 'Arial Narrow',
      size: 11,
      bold: true,
    };
    sheet.getCell(`B${rowNumber}`).alignment = {
      horizontal: 'left',
      vertical: 'middle',
    };
    return sheet;
  }

  protected tableHeaderSetStyles(
    sheet: any,
    lastRowNumber: number,
    lastLetterIndex: number,
  ) {
    for (let i = 65; i <= lastLetterIndex; i++) {
      const letter = String.fromCharCode(i);

      for (let j = 0; j <= 1; j++) {
        sheet.getCell(letter + (lastRowNumber - j)).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '#ffd8d8d8' },
        };
        sheet.getCell(letter + (lastRowNumber - j)).border = {
          top: { style: 'thin', color: { argb: 'FFA5A5A5' } },
          left: { style: 'thin', color: { argb: 'FFA5A5A5' } },
          right: { style: 'thin', color: { argb: 'FFA5A5A5' } },
          bottom: { style: 'thin', color: { argb: 'FFA5A5A5' } },
        };
        sheet.getCell(letter + (lastRowNumber - j)).font = {
          name: 'Arial Narrow',
          size: 11,
          bold: true,
        };
        sheet.getCell(letter + (lastRowNumber - j)).alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true,
        };
      }
    }
    return sheet;
  }

  protected tableDataSetStyles(
    sheet: any,
    lastLetterIndex: number,
    startRowIndex: number,
    lastRowIndex: number,
  ) {
    for (let i = 65; i <= lastLetterIndex; i++) {
      const letter = String.fromCharCode(i);

      for (let j = 0; j <= lastRowIndex - startRowIndex; j++) {
        sheet.getCell(letter + (lastRowIndex - j)).border = {
          top: { style: 'thin', color: { argb: 'FFA5A5A5' } },
          left: { style: 'thin', color: { argb: 'FFA5A5A5' } },
          right: { style: 'thin', color: { argb: 'FFA5A5A5' } },
          bottom: { style: 'thin', color: { argb: 'FFA5A5A5' } },
        };
        sheet.getCell(letter + (lastRowIndex - j)).font = {
          name: 'Arial Narrow',
          size: 11,
          bold: true,
        };
        sheet.getCell(letter + (lastRowIndex - j)).alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true,
        };
      }
    }
    return sheet;
  }

  protected async createNewExcelFile(report: Object, filePath: string) {
    try {
      let workbook = new Excel.Workbook();

      let sheet = workbook.addWorksheet('report');
      // sheet.addRow(['Название', 'Единица измерения', 'Всего']);

      // Данные об объекте
      // Название объекта
      sheet.addRow([report['object']['name']]);
      let lastRowNumber = sheet.lastRow.number;
      let lastRowAddress = `A${lastRowNumber}`;
      sheet.getCell(lastRowAddress).font = {
        name: 'Arial Narrow',
        size: 14,
        bold: true,
      };
      sheet.getCell(lastRowAddress).alignment = {
        horizontal: 'justify',
        vertical: 'middle',
      };
      sheet.mergeCells(`A${lastRowNumber}`, `G${lastRowNumber}`);

      // Название договора
      sheet.addRow([report['object']['contractName']]);
      lastRowNumber = sheet.lastRow.number;
      lastRowAddress = `A${lastRowNumber}`;
      sheet.getCell(lastRowAddress).font = {
        name: 'Arial Narrow',
        size: 12,
      };
      sheet.getCell(lastRowAddress).alignment = {
        horizontal: 'justify',
        vertical: 'middle',
      };
      sheet.mergeCells(`A${lastRowNumber}`, `C${lastRowNumber}`);

      sheet.addRow([]);

      // Доп инфа
      // Дата работ
      const factDateArr: Array<string> = report['workDate']
        .toISOString()
        .slice(0, 10)
        .split('-');
      const factDateFinaly: string =
        factDateArr[2] + '/' + factDateArr[1] + '/' + factDateArr[0];
      sheet.addRow(['Дата производства работ: ', factDateFinaly]);
      lastRowNumber = sheet.lastRow.number;
      sheet = this.additionalInfoSetStyles(sheet, lastRowNumber);
      // Погодные условия
      sheet.addRow(['Погодные условия: ', report['weather']]);
      lastRowNumber = sheet.lastRow.number;
      sheet = this.additionalInfoSetStyles(sheet, lastRowNumber);
      // Температура
      sheet.addRow(['Температура: ', report['temperature']]);
      lastRowNumber = sheet.lastRow.number;
      sheet = this.additionalInfoSetStyles(sheet, lastRowNumber);
      // Колво рабочих
      sheet.addRow(['Кол-во рабочих на площадке: ', report['workersAmount']]);
      lastRowNumber = sheet.lastRow.number;
      sheet = this.additionalInfoSetStyles(sheet, lastRowNumber);
      // Колво итр
      sheet.addRow(['Кол-во ИТР на площадке: ', report['ItrAmount']]);
      lastRowNumber = sheet.lastRow.number;
      sheet = this.additionalInfoSetStyles(sheet, lastRowNumber);
      // Доп строка пропуск
      sheet.addRow([]);
      lastRowNumber = sheet.lastRow.number;
      sheet = this.additionalInfoSetStyles(sheet, lastRowNumber);

      // Факт загловок
      sheet.addRow(['Факт выполненных работ на: ' + factDateFinaly]);
      lastRowNumber = sheet.lastRow.number;
      sheet.getRow(lastRowNumber).height = 30;
      sheet.getCell(`A${lastRowNumber}`).font = {
        name: 'Arial Narrow',
        size: 12,
        bold: true,
      };
      sheet.getCell(`A${lastRowNumber}`).alignment = {
        horizontal: 'center',
        vertical: 'middle',
      };
      sheet.mergeCells(`A${lastRowNumber}`, `B${lastRowNumber}`);

      // Факт данные
      sheet.addRow([
        '№ п/п',
        'Вид работ',
        'Наименование работ',
        'помещение (МОП / помещения / квартиры)',
        'ед.изм.',
        'Бригада',
        'Кол-во чел в бригаде',
        'ПЛАН',
        '',
        '',
        'ФАКТ',
        '',
        '',
        'Комментарии к заданиям / причина не выполнения плана',
      ]);
      sheet.addRow([
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'Кол-во этажей',
        'Кол-во на 1 этаж',
        'Всего',
        'Кол-во этажей',
        'Кол-во на 1 этаж',
        'Всего',
        '',
      ]);

      lastRowNumber = sheet.lastRow.number;
      sheet.mergeCells(`A${lastRowNumber - 1}`, `A${lastRowNumber}`);
      sheet.mergeCells(`B${lastRowNumber - 1}`, `B${lastRowNumber}`);
      sheet.mergeCells(`C${lastRowNumber - 1}`, `C${lastRowNumber}`);
      sheet.mergeCells(`D${lastRowNumber - 1}`, `D${lastRowNumber}`);
      sheet.mergeCells(`E${lastRowNumber - 1}`, `E${lastRowNumber}`);
      sheet.mergeCells(`F${lastRowNumber - 1}`, `F${lastRowNumber}`);
      sheet.mergeCells(`G${lastRowNumber - 1}`, `G${lastRowNumber}`);

      sheet.mergeCells(`H${lastRowNumber - 1}`, `J${lastRowNumber - 1}`);
      sheet.mergeCells(`K${lastRowNumber - 1}`, `M${lastRowNumber - 1}`);

      sheet.mergeCells(`N${lastRowNumber - 1}`, `N${lastRowNumber}`);

      // Перекрашиваем шапку, ставим границы
      sheet = this.tableHeaderSetStyles(sheet, lastRowNumber, 78);

      sheet.getRow(lastRowNumber).height = 40;

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
        const workType: string =
          row['workType'] === 'main' ? 'По смете' : 'Доп';
        sheet.addRow([
          i,
          workType,
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
      lastRowNumber = sheet.lastRow.number;
      sheet = this.tableDataSetStyles(
        sheet,
        78,
        lastRowNumber - i,
        lastRowNumber,
      );

      sheet.addRow([]);

      // План заголовок
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

      lastRowNumber = sheet.lastRow.number;
      sheet.getRow(lastRowNumber).height = 30;
      sheet.getCell(`A${lastRowNumber}`).font = {
        name: 'Arial Narrow',
        size: 12,
        bold: true,
      };
      sheet.getCell(`A${lastRowNumber}`).alignment = {
        horizontal: 'center',
        vertical: 'middle',
      };
      sheet.mergeCells(`A${lastRowNumber}`, `B${lastRowNumber}`);

      // План шапка
      sheet.addRow([
        '№ п/п',
        'Вид работ',
        'Наименование работ',
        'помещение (МОП / помещения / квартиры)',
        'ед.изм.',
        'Бригада',
        'Кол-во чел в бригаде',
        'ПЛАН',
        '',
        '',
        'Комментарии к заданиям',
      ]);
      sheet.addRow([
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'Кол-во этажей',
        'Кол-во на 1 этаж',
        'Всего',
        '',
      ]);

      lastRowNumber = sheet.lastRow.number;
      sheet.mergeCells(`A${lastRowNumber - 1}`, `A${lastRowNumber}`);
      sheet.mergeCells(`B${lastRowNumber - 1}`, `B${lastRowNumber}`);
      sheet.mergeCells(`C${lastRowNumber - 1}`, `C${lastRowNumber}`);
      sheet.mergeCells(`D${lastRowNumber - 1}`, `D${lastRowNumber}`);
      sheet.mergeCells(`E${lastRowNumber - 1}`, `E${lastRowNumber}`);
      sheet.mergeCells(`F${lastRowNumber - 1}`, `F${lastRowNumber}`);
      sheet.mergeCells(`G${lastRowNumber - 1}`, `G${lastRowNumber}`);

      sheet.mergeCells(`H${lastRowNumber - 1}`, `J${lastRowNumber - 1}`);

      sheet.mergeCells(`K${lastRowNumber - 1}`, `N${lastRowNumber}`);

      // Перекрашиваем шапку, ставим границы
      sheet = this.tableHeaderSetStyles(sheet, lastRowNumber, 75);

      sheet.getRow(lastRowNumber).height = 40;

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
        const workType: string =
          row['workType'] === 'main' ? 'По смете' : 'Доп';
        sheet.addRow([
          i,
          workType,
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

        lastRowNumber = sheet.lastRow.number;
        sheet.mergeCells(`K${lastRowNumber}`, `N${lastRowNumber}`);
      }
      lastRowNumber = sheet.lastRow.number;
      sheet = this.tableDataSetStyles(
        sheet,
        75,
        lastRowNumber - i,
        lastRowNumber,
      );

      sheet.addRow([]);

      // Проблемные вопросы
      // Заголовок
      sheet.addRow(['ПРОБЛЕМНЫЕ ВОПРОСЫ']);
      lastRowNumber = sheet.lastRow.number;
      sheet.getRow(lastRowNumber).height = 28;
      sheet.getCell(`A${lastRowNumber}`).font = {
        name: 'Arial Narrow',
        size: 11,
        bold: true,
      };
      sheet.getCell(`A${lastRowNumber}`).alignment = {
        horizontal: 'left',
        vertical: 'middle',
      };
      sheet.getCell(`A${lastRowNumber}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '#fff7caac' },
      };
      sheet.mergeCells(`A${lastRowNumber}`, `N${lastRowNumber}`);

      // Шапка таблицы
      sheet.addRow([
        '№ п/п',
        'Описание проблемы / вопроса',
        '',
        '',
        'Принятые меры',
      ]);
      sheet.addRow([]);
      lastRowNumber = sheet.lastRow.number;
      sheet = this.tableHeaderSetStyles(sheet, lastRowNumber, 75);

      sheet.mergeCells(`A${lastRowNumber - 1}`, `A${lastRowNumber}`);

      sheet.mergeCells(`B${lastRowNumber}`, `D${lastRowNumber - 1}`);
      sheet.mergeCells(`E${lastRowNumber}`, `N${lastRowNumber - 1}`);

      // Строки проблемных вопросов
      i = 1;
      for (const row of report['problems']['ProblemsRow']) {
        sheet.addRow([i, row['description'], '', '', row['takenMeasures']]);

        lastRowNumber = sheet.lastRow.number;
        sheet.mergeCells(`B${lastRowNumber}`, `D${lastRowNumber}`);
        sheet.mergeCells(`E${lastRowNumber}`, `N${lastRowNumber}`);

        i += 1;
      }
      lastRowNumber = sheet.lastRow.number;
      sheet = this.tableDataSetStyles(
        sheet,
        75,
        lastRowNumber - i,
        lastRowNumber,
      );

      sheet.addRow([]);

      // Подготовил
      sheet.addRow(['Подготовил ООО "Д5 ИНЖИНИРИНГ":']);
      lastRowNumber = sheet.lastRow.number;
      sheet.getCell(`A${lastRowNumber}`).font = {
        name: 'Arial Narrow',
        size: 11,
        bold: true,
      };

      sheet.addRow([report['author']['name']]);
      sheet.addRow(['Тел.:' + report['author']['phone']]);

      sheet.getColumn('A').width = 30;
      sheet.getColumn('B').width = 20;
      sheet.getColumn('C').width = 25;
      sheet.getColumn('D').width = 20;
      sheet.getColumn('E').width = 15;
      sheet.getColumn('F').width = 12;
      sheet.getColumn('G').width = 12;
      sheet.getColumn('H').width = 12;
      sheet.getColumn('I').width = 12;
      sheet.getColumn('J').width = 12;
      sheet.getColumn('K').width = 12;
      sheet.getColumn('L').width = 12;
      sheet.getColumn('M').width = 12;
      sheet.getColumn('N').width = 30;

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
