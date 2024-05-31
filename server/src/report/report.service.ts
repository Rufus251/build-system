import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private readonly databaseService: DatabaseService) {}

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
  ) {
    try {
      objectId = Number.isNaN(objectId) ? undefined : objectId;
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

  async update(id: number, dto: UpdateReportDto) {
    try {
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

  async remove(id: number) {
    try {
      const res = await this.databaseService.report.delete({
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
