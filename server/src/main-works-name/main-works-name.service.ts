import { Injectable } from '@nestjs/common';
import { CreateMainWorksNameDto } from './dto/create-main-works-name.dto';
import { UpdateMainWorksNameDto } from './dto/update-main-works-name.dto';
import { DatabaseService } from 'src/database/database.service';
import * as Excel from 'exceljs';
import { JsonObject } from '@prisma/client/runtime/library';
import * as fs from 'fs';
@Injectable()
export class MainWorksNameService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(smetaId: number, dto: CreateMainWorksNameDto) {
    try {
      const res = await this.databaseService.mainWorksName.create({
        data: {
          ...dto,
          smeta: {
            connect: {
              id: smetaId,
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

  async createMainWorksArray(filePath: string) {
    let workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    let mainWorks: Array<CreateMainWorksNameDto> = [];
    workbook.eachSheet((worksheet, sheetId) => {
      // Находит 4 лист в файле
      if (sheetId == 1) {
        // Переменные для unit и maxValue, если в таблице есть, они перезаписываются, если в таблице пустая строка, остаются прежними
        let unit: string = '';
        let maxValue: number = 0;
        for (let i = 4; ; i++) {
          const workNumber = worksheet.getCell('A' + i).value;
          const workName = worksheet.getCell('B' + i).value;
          // Проверка на то, что таблица закончилась
          if (
            worksheet.getCell('B' + i).value === null &&
            worksheet.getCell('B' + (i + 1)).value === null
          ) {
            break;
          } else if (workName === null || workName == 'Наименование работ') {
            continue;
          }

          const mainWork: CreateMainWorksNameDto = {
            name: null,
            unit: null,
            maxValue: null,
            done: null,
            left: null,
          };

          // mainWork.name
          if (typeof workName === 'object') {
            mainWork.name = workNumber + ' ' + workName['result'];
          } else if (typeof workName === 'string') {
            mainWork.name = workNumber + ' ' + workName;
          }

          // mainWork.unit
          const workUnit = worksheet.getCell('C' + i).value;
          if (workUnit !== null) {
            if (typeof workUnit === 'object') {
              unit = workUnit['result'];
            } else if (typeof workUnit === 'string') {
              unit = workUnit;
            }
          }
          mainWork.unit = unit;

          // mainWork.maxValue
          const workMaxValue = worksheet.getCell('D' + i).value;
          if (workMaxValue !== null) {
            if (typeof workMaxValue === 'object') {
              maxValue = +workMaxValue['result'];
            } else if (typeof workMaxValue === 'number') {
              maxValue = +workMaxValue;
            }
          }
          mainWork.maxValue = maxValue;
          mainWork.left = maxValue;
          mainWork.done = 0;

          mainWorks.push(mainWork);
        }
      }
    });
    return mainWorks;
  }

  async uploadXlsx(file: Express.Multer.File, smetaId: number) {
    try {
      const mainWorksArray = await this.createMainWorksArray(file.path);
      // deleting file after geting data
      fs.unlinkSync(file.path);

      for await (const iterator of mainWorksArray) {
        await this.databaseService.mainWorksName.create({
          data: {
            ...iterator,
            smeta: {
              connect: {
                id: smetaId,
              },
            },
          },
        });
      }
      return mainWorksArray;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(smetaId: number) {
    try {
      smetaId = Number.isNaN(smetaId) ? undefined : smetaId;
      const res = await this.databaseService.mainWorksName.findMany({
        where: {
          smetaId,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.mainWorksName.findFirst({
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

  async update(id: number, dto: UpdateMainWorksNameDto) {
    try {
      const res = await this.databaseService.mainWorksName.update({
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
      const res = await this.databaseService.mainWorksName.delete({
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

  async removeOnSmeta(smetaId: number) {
    try {
      const res = await this.databaseService.mainWorksName.deleteMany({
        where: {
          smetaId,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
