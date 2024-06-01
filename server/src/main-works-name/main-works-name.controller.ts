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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MainWorksNameService } from './main-works-name.service';
import { CreateMainWorksNameDto } from './dto/create-main-works-name.dto';
import { UpdateMainWorksNameDto } from './dto/update-main-works-name.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('main-works-name')
@ApiTags('main-works-name')
export class MainWorksNameController {
  constructor(private readonly mainWorksNameService: MainWorksNameService) {}

  @Post(':smetaId')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async create(
    @Param('smetaId') smetaId: string,
    @Body() CreateMainWorksNameDto: CreateMainWorksNameDto,
  ) {
    return await this.mainWorksNameService.create(
      +smetaId,
      CreateMainWorksNameDto,
    );
  }

  @Post('uploadXlsx')
  @Roles(Role.admin, Role.manager)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.mainWorksNameService.uploadXlsx(file);
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
    return await this.mainWorksNameService.findAll(+smetaId);
  }

  @Get(':id')
  @Roles(Role.admin, Role.manager)
  async findOne(@Param('id') id: string) {
    return await this.mainWorksNameService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin, Role.manager)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() UpdateMainWorksNameDto: UpdateMainWorksNameDto,
  ) {
    return await this.mainWorksNameService.update(+id, UpdateMainWorksNameDto);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.manager)
  async remove(@Param('id') id: string) {
    return await this.mainWorksNameService.remove(+id);
  }

  @Delete('smeta/:smetaId')
  @Roles(Role.admin, Role.manager)
  async removeOnSmeta(@Param('smetaId') smetaId: string) {
    return await this.mainWorksNameService.removeOnSmeta(+smetaId);
  }
}
