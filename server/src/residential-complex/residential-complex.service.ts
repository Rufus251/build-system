import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResidentialComplexDto } from './dto/create-residential-complex.dto';
import { UpdateResidentialComplexDto } from './dto/update-residential-complex.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ResidentialComplexService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateResidentialComplexDto) {
    try {
      const res = await this.databaseService.residentialComplex.create({
        data: {
          ...dto,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const res = await this.databaseService.residentialComplex.findMany({
        include: {
          objects: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.residentialComplex.findFirst({
        where: {
          id,
        },
        include: {
          objects: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, dto: UpdateResidentialComplexDto) {
    try {
      const res = await this.databaseService.residentialComplex.update({
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.databaseService.residentialComplex.delete({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
