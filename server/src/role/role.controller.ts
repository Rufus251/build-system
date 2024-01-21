import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get("RolesOnUser")
  async findAllRolesOnUser() {
    return await this.roleService.findAllRolesOnUser();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(+id);
  }
}
