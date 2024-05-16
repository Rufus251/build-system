import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSmetaDto {
      @IsString()
      @ApiProperty()
      name: string
}
