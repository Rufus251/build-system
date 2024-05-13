import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(dto: CreateUserDto) {
    try {
      const hashPass = await bcrypt.hash(dto.password, 7);
      dto.password = hashPass
      const res = await this.databaseService.user.create({
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

  async findAll() {
    try {
      const res = await this.databaseService.user.findMany()
      return res
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

  async update(userId: number, dto: UpdateUserDto) {
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
      throw new HttpException("Internal", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
