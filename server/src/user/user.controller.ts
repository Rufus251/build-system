import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post(":roleId")
  @UsePipes(new ValidationPipe())
  async create(@Param('roleId') roleId: string, @Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto, +roleId);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':userId/:roleId')
  @UsePipes(new ValidationPipe())
  async update(@Param('userId') userId: string, @Param('roleId') roleId: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+userId, +roleId, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
