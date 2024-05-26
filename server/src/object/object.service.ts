import { Injectable } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ObjectService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(complexId: number, dto: CreateObjectDto) {
    try {
      const res = await this.databaseService.object.create({
        data: {
          ...dto,
          residentialComplex: {
            connect: {
              id: complexId
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
      const res = await this.databaseService.object.findMany({
        include: {
          smeta: true
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
      const res = await this.databaseService.object.findFirst({
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

  async update(id: number, dto: UpdateObjectDto) {
    try {
      const res = await this.databaseService.object.update({
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
      const res = await this.databaseService.object.delete({
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

  async findOOU() {
    try {
      const res = await this.databaseService.objectOnUser.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }
}
