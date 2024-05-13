import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateResidentialComplexDto {
      @IsString()
      @ApiProperty()
      name: string
}
