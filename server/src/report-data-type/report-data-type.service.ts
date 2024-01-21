import { Injectable } from '@nestjs/common';
import { CreateReportDataTypeDto } from './dto/create-report-data-type.dto';
import { UpdateReportDataTypeDto } from './dto/update-report-data-type.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReportDataTypeService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(dto: CreateReportDataTypeDto) {
    try {
      const res = await this.databaseService.reportDataType.create({
        data: {
          ...dto
        }
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findAll() {
    try {
      const res = await this.databaseService.reportDataType.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.reportDataType.findFirst({
        where: {
          id
        }
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async update(id: number, dto: UpdateReportDataTypeDto) {
    try {
      const res = await this.databaseService.reportDataType.update({
        where: {
          id
        },
        data: {
          ...dto
        }
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async remove(id: number) {
    try {
      const res = await this.databaseService.reportDataType.delete({
        where: {
          id
        }
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }
}
