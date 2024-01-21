import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateReportDataTypeDto {
      @IsString()
      @ApiProperty()
      name: string
}
