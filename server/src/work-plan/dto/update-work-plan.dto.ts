import { PartialType } from '@nestjs/swagger';
import { CreateWorkPlanDto } from './create-work-plan.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class UpdateWorkPlanDto extends PartialType(CreateWorkPlanDto) {
      @ApiProperty()
      @IsDateString()
      planDate?: Date
}
