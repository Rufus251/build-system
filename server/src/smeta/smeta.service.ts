import { Injectable } from '@nestjs/common';
import { CreateSmetaDto } from './dto/create-smeta.dto';
import { UpdateSmetaDto } from './dto/update-smeta.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SmetaService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(objectId: number, dto: CreateSmetaDto) {
    try {
      const res = await this.databaseService.smeta.create({
        data: {
          ...dto,
          object: {
            connect: {
              id: objectId
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
      const res = await this.databaseService.smeta.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.smeta.findFirst({
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

  async update(id: number, dto: UpdateSmetaDto) {
    try {
      const res = await this.databaseService.smeta.update({
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
      const res = await this.databaseService.smeta.delete({
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
