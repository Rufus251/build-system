import { Injectable } from '@nestjs/common';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReportRowService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(dto: CreateReportRowDto, reportId: number, dataTypeId: number) {
    try {
      const res = await this.databaseService.reportRow.create({
        data: {
          ...dto,
          report: {
            connect: {
              id: reportId
            }
          },
          key: {
            connect: {
              id: dataTypeId
            }
          }
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
      const res = await this.databaseService.reportRow.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.reportRow.findFirst({
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

  async update(id: number, dto: UpdateReportRowDto) {
    try {
      const res = await this.databaseService.reportRow.update({
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
      const res = await this.databaseService.reportRow.delete({
        where: {
          id
        }
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    };
  }
}
