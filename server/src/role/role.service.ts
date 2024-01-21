import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(dto: CreateRoleDto) {
    try {
      const res = await this.databaseService.role.create({
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

  async findAll() {
    try {
      const res = await this.databaseService.role.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findAllRolesOnUser() {
    try {
      const res = await this.databaseService.roleOnUser.findMany()
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.databaseService.role.findFirst({
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

  async update(id: number, dto: UpdateRoleDto) {
    try {
      const res = await this.databaseService.role.update({
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
      const res = await this.databaseService.role.delete({
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
