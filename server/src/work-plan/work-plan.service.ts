import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkPlanDto } from './dto/create-work-plan.dto';
import { UpdateWorkPlanDto } from './dto/update-work-plan.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WorkPlanService {
  constructor(private readonly databaseService: DatabaseService,
    private readonly JwtService: JwtService,) {}

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

  async create(reportId: number, dto: CreateWorkPlanDto) {
    try {
      const res = await this.databaseService.workPlan.create({
        data: {
          ...dto,
          Report: {
            connect: {
              id: reportId,
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

  async findAll(reportId: number) {
    try {
      reportId = Number.isNaN(reportId) ? undefined : reportId;
      const res = await this.databaseService.workPlan.findMany({
        where: {
          reportId,
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
      const res = await this.databaseService.workPlan.findFirst({
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

  async update(id: number, dto: UpdateWorkPlanDto, request: Request) {
    try {
      const [role] = await this.checkRole(request);
      if (role === 'user') {
        const report = await this.databaseService.workPlan.findUnique({
          where: {
            id,
          },
          select: {
            Report: {
              select: {
                workDate: true,
              }
            }
          },
        });
        const reportTime: Date = report.Report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }
      const res = await this.databaseService.workPlan.update({
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
        const report = await this.databaseService.workPlan.findUnique({
          where: {
            id,
          },
          select: {
            Report: {
              select: {
                workDate: true,
              }
            }
          },
        });
        const reportTime: Date = report.Report.workDate;

        const checkResult: boolean = await this.checkTimeForUser(
          request,
          reportTime,
        );
        if (!checkResult) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }
      const res = await this.databaseService.workPlan.delete({
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
