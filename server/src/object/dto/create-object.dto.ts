import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateObjectDto {
      @IsString()
      @ApiProperty()
      name: string
      
      @IsString()
      @ApiProperty()
      contractName: string
}
