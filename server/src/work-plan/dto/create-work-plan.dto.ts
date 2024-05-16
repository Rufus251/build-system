import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";
export class CreateWorkPlanDto {
      @ApiProperty()
      @IsDateString()
      planDate: Date
}
