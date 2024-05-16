import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateAdditionalWorksNameDto {
      @IsString()
      @ApiProperty()
      name: string

      @IsString()
      @ApiProperty()
      unit: string

      @IsNumber()
      @ApiProperty()
      total: number
}
