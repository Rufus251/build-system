import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProblemsRowDto } from './dto/create-problems-row.dto';
import { UpdateProblemsRowDto } from './dto/update-problems-row.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProblemsRowService {
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
  async create(problemId: number, dto: CreateProblemsRowDto) {
    try {
      const res = await this.databaseService.problemsRow.create({
        data: {
          ...dto,
          problems: {
            connect: {
              id: problemId,
            },
          },
        },
      });
      await this.databaseService.report.updateMany({
        where: {
          problems: {
            id: problemId,
          },
        },
        data: {
          hasProblems: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    try {
      const res = await this.databaseService.problemsRow.findMany();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.problemsRow.findFirst({
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

  async update(id: number, dto: UpdateProblemsRowDto, request: Request) {
    try {
      const [role] = await this.checkRole(request);
      if (role === 'user') {
        const report = await this.databaseService.problemsRow.findUnique({
          where: {
            id,
          },
          select: {
            problems: {
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
        const reportTime: Date = report.problems.Report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }
      const res = await this.databaseService.problemsRow.update({
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
        const report = await this.databaseService.problemsRow.findUnique({
          where: {
            id,
          },
          select: {
            problems: {
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
        const reportTime: Date = report.problems.Report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }
      const res = await this.databaseService.problemsRow.delete({
        where: {
          id,
        },
      });
      const problemCount = await this.databaseService.report.findFirst({
        where: {
          problems: {
            id: res.problemsId,
          },
        },
        select: {
          id: true,
          problems: {
            select: {
              _count: {
                select: {
                  ProblemsRow: true,
                },
              },
            },
          },
        },
      });
      if (problemCount.problems._count.ProblemsRow === 0) {
        await this.databaseService.report.update({
          where: {
            id: problemCount.id,
          },
          data: {
            hasProblems: false,
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
