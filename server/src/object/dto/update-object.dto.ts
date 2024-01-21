import { PartialType } from '@nestjs/swagger';
import { CreateObjectDto } from './create-object.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateObjectDto extends PartialType(CreateObjectDto) {
      @IsString()
      @ApiProperty()
      name: string
}
