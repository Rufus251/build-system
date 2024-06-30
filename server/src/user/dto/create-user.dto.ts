import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
      @IsString()
      @ApiProperty()
      login: string

      @IsString()
      @ApiProperty()
      name: string

      @IsString()
      @ApiProperty()
      password: string

      @IsString()
      @ApiProperty()
      phone: string

      @IsString()
      @ApiProperty()
      role: string = 'user'

      @IsString()
      @ApiProperty()
      position: string = 'Сотрудник'

      @IsString()
      @ApiProperty()
      @IsOptional()
      token?:string
}

