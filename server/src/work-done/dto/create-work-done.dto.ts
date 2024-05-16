import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class CreateWorkDoneDto {
      @ApiProperty()
      @IsDateString()
      doneDate: Date
}
