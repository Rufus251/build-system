import { Injectable } from '@nestjs/common';
import { CreateProblemsRowDto } from './dto/create-problems-row.dto';
import { UpdateProblemsRowDto } from './dto/update-problems-row.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProblemsRowService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(problemId: number, dto: CreateProblemsRowDto) {
    try {
      const res = await this.databaseService.problemsRow.create({
        data: {
          ...dto,
          problems: {
            connect: {
              id: problemId
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
      const res = await this.databaseService.problemsRow.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.problemsRow.findFirst({
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

  async update(id: number, dto: UpdateProblemsRowDto) {
    try {
      const res = await this.databaseService.problemsRow.update({
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
      const res = await this.databaseService.problemsRow.delete({
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
