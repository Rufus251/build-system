import { Injectable } from '@nestjs/common';
import { CreateMainWorksNameDto } from './dto/create-main-works-name.dto';
import { UpdateMainWorksNameDto } from './dto/update-main-works-name.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MainWorksNameService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(smetaId: number, dto: CreateMainWorksNameDto) {
    try {
      const res = await this.databaseService.mainWorksName.create({
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
      const res = await this.databaseService.mainWorksName.findMany({
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
      const res = await this.databaseService.mainWorksName.findFirst({
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

  async update(id: number, dto: UpdateMainWorksNameDto) {
    try {
      const res = await this.databaseService.mainWorksName.update({
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
      const res = await this.databaseService.mainWorksName.delete({
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
