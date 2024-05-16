import { Injectable } from '@nestjs/common';
import { CreateAdditionalWorksNameDto } from './dto/create-additional-works-name.dto';
import { UpdateAdditionalWorksNameDto } from './dto/update-additional-works-name.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdditionalWorksNameService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(smetaId: number, dto: CreateAdditionalWorksNameDto) {
    try {
      const res = await this.databaseService.additionalWorksName.create({
        data: {
          ...dto,
          smeta: {
            connect: {
              id: smetaId
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
      const res = await this.databaseService.additionalWorksName.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.additionalWorksName.findFirst({
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

  async update(id: number, dto: UpdateAdditionalWorksNameDto) {
    try {
      const res = await this.databaseService.additionalWorksName.update({
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
      const res = await this.databaseService.additionalWorksName.delete({
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
