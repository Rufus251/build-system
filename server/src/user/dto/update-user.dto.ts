import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
      @IsString()
      @ApiProperty()
      login?: string

      @IsString()
      @ApiProperty()
      name?: string

      @IsString()
      @ApiProperty()
      password?: string

      @IsString()
      @ApiProperty()
      phone?: string

      @IsString()
      @ApiProperty()
      role?: string

      @IsString()
      @ApiProperty()
      @IsOptional()
      token?:string
}
