import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AdditionalWorksNameService } from './additional-works-name.service';
import { CreateAdditionalWorksNameDto } from './dto/create-additional-works-name.dto';
import { UpdateAdditionalWorksNameDto } from './dto/update-additional-works-name.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('additional-works-name')
@ApiTags('additional-works-name')
export class AdditionalWorksNameController {
  constructor(
    private readonly additionalWorksNameService: AdditionalWorksNameService,
  ) {}

  @Post(':smetaId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async create(
    @Param('smetaId') smetaId: string,
    @Body() CreateAdditionalWorksNameDto: CreateAdditionalWorksNameDto,
  ) {
    return await this.additionalWorksNameService.create(
      +smetaId,
      CreateAdditionalWorksNameDto,
    );
  }

  @Get()
  @ApiQuery({
    name: 'smetaId',
    type: Number,
    description: 'Id сметы объекта',
    required: false,
  })
  @Roles(Role.admin, Role.manager)
  async findAll(@Query('smetaId') smetaId?: number) {
    return await this.additionalWorksNameService.findAll(+smetaId);
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.additionalWorksNameService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() UpdateAdditionalWorksNameDto: UpdateAdditionalWorksNameDto,
  ) {
    return await this.additionalWorksNameService.update(
      +id,
      UpdateAdditionalWorksNameDto,
    );
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.additionalWorksNameService.remove(+id);
  }
}
