import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateReportDto {
      @ApiProperty()
      @IsString()
      workType: string

      @ApiProperty()
      @IsDateString()
      workDate: Date

      @ApiProperty()
      @IsString()
      weather: string

      @ApiProperty()
      @IsString()
      temperature: string

      @ApiProperty()
      @IsNumber()
      workersAmount: number

      @ApiProperty()
      @IsNumber()
      ItrAmount: number

      @ApiProperty()
      @IsBoolean()
      hasProblems: boolean

      @IsString()
      @ApiProperty()
      additional: string

      @ApiProperty()
      @IsBoolean()
      hasAdditional: boolean

}
