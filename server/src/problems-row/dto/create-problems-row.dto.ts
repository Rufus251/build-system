import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateProblemsRowDto {
      @IsString()
      @ApiProperty()
      description: string

      @IsString()
      @ApiProperty()
      takenMeasures: string
}
