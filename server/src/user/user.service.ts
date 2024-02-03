import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(dto: CreateUserDto, roleId: number) {
    try {
      const hashPass = await bcrypt.hash(dto.password, 7);
      dto.password = hashPass
      const res = await this.databaseService.user.create({
        data: {
          ...dto,
          RoleOnUser: {
            create: {
              role: {
                connect: {
                  id: roleId
                }
              }
            }
          }
        }
      })
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findAll() {
    try {
      const resUsers = await this.databaseService.user.findMany()
      const users = []
      for await (let user of resUsers) {
        const userRole = await this.databaseService.role.findMany({
          where: {
            RoleOnUser: {
              some: {
                userId: user.id
              }
            }
          }
        })
        users.push({ ...user, 'role': userRole[0].name })
      }

      return users
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.user.findFirst({
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

  // to do: role change
  async update(userId: number, roleId: number, dto: UpdateUserDto) {
    try {
      const res = await this.databaseService.user.update({
        where: {
          id: userId
        },
        data: {
          ...dto,
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
      const res = await this.databaseService.user.delete({
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
