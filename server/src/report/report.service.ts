import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ReportService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
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
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
