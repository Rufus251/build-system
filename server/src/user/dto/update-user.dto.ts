import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiProperty()
  @IsOptional()
  login?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  name?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  password?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  phone?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  role?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  token?: string;
}
