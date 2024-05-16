import { Injectable } from '@nestjs/common';
import { CreateWorkDoneDto } from './dto/create-work-done.dto';
import { UpdateWorkDoneDto } from './dto/update-work-done.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WorkDoneService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(reportId: number, dto: CreateWorkDoneDto) {
    try {
      const res = await this.databaseService.workDone.create({
        data: {
          ...dto,
          Report: {
            connect: {
              id: reportId
            }
          },
        },
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findAll() {
    try {
      const res = await this.databaseService.workDone.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.workDone.findFirst({
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

  async update(id: number, dto: UpdateWorkDoneDto) {
    try {
      const res = await this.databaseService.workDone.update({
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
      const res = await this.databaseService.workDone.delete({
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
