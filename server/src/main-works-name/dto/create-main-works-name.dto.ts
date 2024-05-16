import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateMainWorksNameDto {
      @IsString()
      @ApiProperty()
      name: string

      @IsString()
      @ApiProperty()
      unit: string

      @IsNumber()
      @ApiProperty()
      maxValue: number

      @IsNumber()
      @ApiProperty()
      done: number

      @IsNumber()
      @ApiProperty()
      left: number
}
