import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateReportDto {
      @IsString()
      @ApiProperty()
      additional: string

      @ApiProperty()
      @IsString()
      workType: string

      @ApiProperty()
      @IsDate()
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

      @ApiProperty()
      @IsBoolean()
      hasAdditional: boolean

}
