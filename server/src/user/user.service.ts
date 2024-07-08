import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateUserDto) {
    try {
      const hashPass = await bcrypt.hash(dto.password, 7);
      dto.password = hashPass;
      const res = await this.databaseService.user.create({
        data: {
          ...dto,
        },
        include: {
          objects: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    login: string,
    name: string,
    role: string,
    position: string,
    complexId: number,
    objectId: number,
  ) {
    try {
      const query: Prisma.UserFindManyArgs = {
        select: {
          id: true,
          login: true,
          name: true,
          role: true,
          position: true,
          phone: true,
          objects: {
            include: {
              object: true,
            },
          },
        },
        where: {
          login,
          name,
          role,
          position,
        },
      };

      objectId = Number.isNaN(objectId) ? undefined : objectId;
      complexId = Number.isNaN(complexId) ? undefined : complexId;
      if (objectId || complexId) {
        query.where = {
          ...query.where,
          objects: {
            some: {
              AND: [
                {
                  objectId,
                },
                {
                  object: {
                    residentialComplexId: complexId,
                  },
                },
              ],
            },
          },
        };
      }
      const res = await this.databaseService.user.findMany(query);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAllLogins() {
    try {
      const res = await this.databaseService.user.findMany({
        select: {
          login: true,
        },
        distinct: ['login'],
        orderBy: {
          login: 'asc',
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async findAllUsernames() {
    try {
      const res = await this.databaseService.user.findMany({
        select: {
          name: true,
        },
        distinct: ['name'],
        orderBy: {
          name: 'asc',
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async findAllPositions() {
    try {
      const res = await this.databaseService.user.findMany({
        select: {
          position: true,
        },
        distinct: ['position'],
        orderBy: {
          position: 'asc',
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findUserObjects(id: number) {
    try {
      let res = await this.databaseService.user.findFirst({
        where: {
          id,
        },
        select: {
          objects: {
            select: {
              objectId: true,
              object: {
                select: {
                  residentialComplexId: true,
                },
              },
            },
          },
        },
      });
      if (res) {
        const objects = Array.from(res.objects, (obj) => obj.objectId);
        return objects;
      } else {
        return res;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          login: true,
          name: true,
          role: true,
          position: true,
          phone: true,
          objects: {
            include: {
              object: true,
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

  async addObject(userId: number, objectId: number) {
    try {
      const res = await this.databaseService.user.update({
        where: {
          id: userId,
        },
        data: {
          objects: {
            create: {
              object: {
                connect: {
                  id: objectId,
                },
              },
            },
          },
        },
        select: {
          id: true,
          login: true,
          name: true,
          role: true,
          phone: true,
          objects: {
            include: {
              object: true,
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

  async delObject(userId: number, objectId: number) {
    try {
      await this.databaseService.objectOnUser.deleteMany({
        where: {
          AND: [
            {
              userId,
            },
            {
              objectId,
            },
          ],
        },
      });
      const res = await this.databaseService.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          login: true,
          name: true,
          role: true,
          phone: true,
          objects: {
            include: {
              object: true,
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
  async updateData(userId: number, dto: UpdateUserDto) {
    try {
      if (dto.password) {
        const hashPass = await bcrypt.hash(dto.password, 7);
        dto.password = hashPass;
      }
      const res = await this.databaseService.user.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
        include: {
          objects: {
            include: {
              object: true,
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

  async remove(id: number) {
    try {
      const res = await this.databaseService.user.delete({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
