import {
  Body,
  Headers,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiHeader, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JsonObject } from '@prisma/client/runtime/library';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { Request, Response } from 'express';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('loginPassword')
  @ApiResponse({ status: 201, description: 'Return user' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  async loginPassword(@Body() dto: LoginUserDto) {
    const res = await this.authService.loginPassword(dto);
    return res;
  }

  @Get('loginJwt')
  @Roles(Role.admin, Role.manager, Role.user)
  @ApiResponse({ status: 201, description: 'Return user' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async loginJwt(@Headers() header: JsonObject) {
    try {
      const token = header.authorization.toString().split(' ')[1];
      const res = await this.authService.loginJwt(token);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
    }
  }
}
