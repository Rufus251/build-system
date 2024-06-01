import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateAdditionalWorksNameDto } from './dto/create-additional-works-name.dto';
import { UpdateAdditionalWorksNameDto } from './dto/update-additional-works-name.dto';
import { DatabaseService } from 'src/database/database.service';
import * as Excel from 'exceljs';
import * as fs from 'fs';
import Response from 'express';
@Injectable()
export class AdditionalWorksNameService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(smetaId: number, dto: CreateAdditionalWorksNameDto) {
    try {
      const res = await this.databaseService.additionalWorksName.create({
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

  async findAll(smetaId: number) {
    try {
      smetaId = Number.isNaN(smetaId) ? undefined : smetaId;
      const res = await this.databaseService.additionalWorksName.findMany({
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
      const res = await this.databaseService.additionalWorksName.findFirst({
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

  async createNewExcelFile(
    additionalWorks: Array<CreateAdditionalWorksNameDto>,
    filePath: string,
  ) {
    try {
      let workbook = new Excel.Workbook();

      let sheet = workbook.addWorksheet('additionalWorks');
      sheet.addRow(['Название', 'Единица измерения', 'Всего']);
      for (const work of additionalWorks) {
        sheet.addRow([work.name, work.unit, work.total]);
      }

      await workbook.xlsx.writeFile(filePath);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async downloadXlsx(smetaId: number) {
    try {
      const additionalWorks =
        await this.databaseService.additionalWorksName.findMany({
          where: {
            smetaId,
          },
        });

      const filePath = './upload/file.xlsx';

      await this.createNewExcelFile(additionalWorks, filePath);
      const file = fs.createReadStream(filePath);
      return file;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: number, dto: UpdateAdditionalWorksNameDto) {
    try {
      const res = await this.databaseService.additionalWorksName.update({
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
      const res = await this.databaseService.additionalWorksName.delete({
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
      const res = await this.databaseService.additionalWorksName.deleteMany({
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
