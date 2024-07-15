import { Injectable } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ObjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(complexId: number, smetaName: string, dto: CreateObjectDto) {
    try {
      const res = await this.databaseService.object.create({
        data: {
          ...dto,
          residentialComplex: {
            connect: {
              id: complexId,
            },
          },
          smeta: {
            create: {
              name: smetaName,
            },
          },
        },
        include: {
          smeta: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(complexId: number, userId: number, objectName: string) {
    try {
      complexId = Number.isNaN(complexId) ? undefined : complexId;
      userId = Number.isNaN(userId) ? undefined : userId;

      let query: Prisma.ObjectFindManyArgs = {
        where: {
          name: objectName,
          residentialComplexId: complexId,
        },
        include: {
          residentialComplex: true,
          smeta: {
            include: {
              mainWorksName: true,
              additionalWorksName: true,
            },
          },
        },
      };

      if (userId) {
        query.where = {
          ...query.where,
          ObjectOnUser: {
            some: {
              userId,
            },
          },
        };
      }
      const res = await this.databaseService.object.findMany(query);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAllNames(complexId: number, userId: number, objectName: string) {
    try {
      complexId = Number.isNaN(complexId) ? undefined : complexId;
      userId = Number.isNaN(userId) ? undefined : userId;

      const res = await this.databaseService.object.findMany({
        where: {
          name: objectName,
          residentialComplexId: complexId,
          ObjectOnUser: {
            some: {
              userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
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
      const res = await this.databaseService.object.findFirst({
        where: {
          id,
        },
        include: {
          smeta: {
            include: {
              mainWorksName: true,
              additionalWorksName: true,
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

  async update(id: number, dto: UpdateObjectDto) {
    try {
      const res = await this.databaseService.object.update({
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
      const res = await this.databaseService.object.delete({
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

  async findOOU() {
    try {
      const res = await this.databaseService.objectOnUser.findMany();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
