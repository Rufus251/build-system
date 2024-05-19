import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateReportRowDto {
      // main / additional
      @IsString()
      @ApiProperty({ enum: ['main', 'additional']})
      workType: string

      // fact / plan
      @IsString()
      @ApiProperty({ enum: ['fact', 'plan']})
      rowType: string

      @IsNumber()
      @ApiProperty()
      planNumberOfFloor: number

      @IsNumber()
      @ApiProperty()
      planQuantityPerFloor: number

      @IsNumber()
      @ApiProperty()
      planTotal: number

      @IsNumber()
      @ApiProperty()
      factNumberOfFloor: number

      @IsNumber()
      @ApiProperty()
      factQuantityPerFloor: number

      @IsNumber()
      @ApiProperty()
      factTotal: number

      @IsString()
      @ApiProperty()
      room: string

      @IsString()
      @ApiProperty()
      brigade: string

      @IsNumber()
      @ApiProperty()
      workersAmount: number

      @IsString()
      @ApiProperty()
      comment: string
}
