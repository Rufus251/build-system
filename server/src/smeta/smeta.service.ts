import { Injectable } from '@nestjs/common';
import { CreateSmetaDto } from './dto/create-smeta.dto';
import { UpdateSmetaDto } from './dto/update-smeta.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SmetaService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(objectId: number, dto: CreateSmetaDto) {
    try {
      const res = await this.databaseService.smeta.create({
        data: {
          ...dto,
          object: {
            connect: {
              id: objectId,
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

  async findAll() {
    try {
      const res = await this.databaseService.smeta.findMany();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.smeta.findFirst({
        where: {
          id,
        },
        include: {
          mainWorksName: {
            include: {
              ReportRow: true,
            },
          },
          additionalWorksName: {
            include: {
              ReportRow: true,
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

  async updateSmeta(smetaId: number) {
    try {
      console.log('updatesmeta');

      let smeta = await this.databaseService.smeta.findFirst({
        where: {
          id: smetaId,
        },
        include: {
          mainWorksName: {
            include: {
              ReportRow: true,
            },
          },
          additionalWorksName: {
            include: {
              ReportRow: true,
            },
          },
        },
      });
      // обновление основных работ
      for await (const mainWork of smeta.mainWorksName) {
        const work = await this.databaseService.mainWorksName.update({
          where: {
            id: mainWork.id,
          },
          data: {
            done: 0,
            left: mainWork.maxValue,
          },
          include: {
            ReportRow: {
              select: {
                factTotal: true,
              },
            },
          },
        });

        for await (const row of work.ReportRow) {
          await this.databaseService.mainWorksName.update({
            where: {
              id: mainWork.id,
            },
            data: {
              done: {
                increment: row.factTotal,
              },
              left: {
                decrement: row.factTotal,
              },
            },
          });
        }
      }
      // Обновление доп работ
      for await (const additionalWork of smeta.additionalWorksName) {
        if (additionalWork.ReportRow.length > 0) {
          const work = await this.databaseService.additionalWorksName.update({
            where: {
              id: additionalWork.id,
            },
            data: {
              total: 0,
            },
            include: {
              ReportRow: {
                select: {
                  factTotal: true,
                },
              },
            },
          });
          for await (const row of work.ReportRow) {
            await this.databaseService.additionalWorksName.update({
              where: {
                id: additionalWork.id,
              },
              data: {
                total: {
                  increment: row.factTotal,
                },
              },
            });
          }
        }
      }

      // Заново получаем смету с обновлёнными данными
      smeta = await this.databaseService.smeta.findFirst({
        where: {
          id: smetaId,
        },
        include: {
          mainWorksName: {
            include: {
              ReportRow: true,
            },
          },
          additionalWorksName: {
            include: {
              ReportRow: true,
            },
          },
        },
      });
      return smeta;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: number, dto: UpdateSmetaDto) {
    try {
      const res = await this.databaseService.smeta.update({
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
      const res = await this.databaseService.smeta.delete({
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
