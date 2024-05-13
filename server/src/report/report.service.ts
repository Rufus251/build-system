import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReportService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(dto: CreateReportDto, authorId: number, objectId: number) {
    try {
      const res = await this.databaseService.report.create({
        data: {
          ...dto,
          author: {
            connect: {
              id: authorId
            }
          },
          object: {
            connect: {
              id: objectId
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
      const res = await this.databaseService.report.findMany({
        include: {
          workDone: true,
          workPlan: true,
          problems: true
        }
      })

      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.report.findFirst({
        where: {
          id
        },
        include: {
          workDone: true,
          workPlan: true,
          problems: true
        }
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findMyReports(id: number) {
    try {
      const res = await this.databaseService.report.findMany({
        where: {
          authorId: id

        },
        include: {
          workDone: true,
          workPlan: true,
          problems: true
        }
      })

      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async update(id: number, dto: UpdateReportDto) {
    try {
      const res = await this.databaseService.report.update({
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
      const res = await this.databaseService.report.delete({
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
