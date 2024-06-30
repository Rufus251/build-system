import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Header,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("addUser")
  @Roles(Role.admin)
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('getAll')
  @Roles(Role.admin, Role.manager)
  @ApiQuery({
    name: 'login',
    type: String,
    description: 'user login',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'user name',
    required: false,
  })
  @ApiQuery({
    name: 'role',
    type: String,
    description: 'user role',
    required: false,
  })
  @ApiQuery({
    name: 'position',
    type: String,
    description: 'Должность сотрудника',
    required: false,
  })
  @ApiQuery({
    name: 'complexId',
    type: Number,
    description: 'Жилые комплексы, к объектам которых привязан пользователь',
    required: false,
  })
  @ApiQuery({
    name: 'objectId',
    type: Number,
    description: 'Объекты, на которых раюотает (к которым привязан) пользователь',
    required: false,
  })
  async findAll(
    @Query('login') login?: string,
    @Query('name') name?: string,
    @Query('role') role?: string,
    @Query('position') position?: string,
    @Query('complexId') complexId?: number,
    @Query('objectId') objectId?: number,
  ) {
    return await this.userService.findAll(login, name, role, position, +complexId, +objectId);
  }

  @Get('getOne/:id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }
  
  @Get('userObjects/:userId')
  @Roles(Role.admin, Role.manager)
  async findUserObjects(@Param('userId') userId: string) {
    return await this.userService.findUserObjects(+userId);
  }

  @Patch('data/:userId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async updateData(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateData(+userId, updateUserDto);
  }

  @Patch('addObject/:userId/:objectId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async addObject(
    @Param('userId') userId: string,
    @Param('objectId') objectId: string,
  ) {
    return await this.userService.addObject(+userId, +objectId);
  }

  @Patch('delObject/:userId/:objectId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async delObject(
    @Param('userId') userId: string,
    @Param('objectId') objectId: string,
  ) {
    return await this.userService.delObject(+userId, +objectId);
  }

  @Delete('delUser/:id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
