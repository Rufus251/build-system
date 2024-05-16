import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
      @ApiProperty()
      @IsString()
      workType?: string

      @ApiProperty()
      @IsDate()
      workDate?: Date

      @ApiProperty()
      @IsString()
      weather?: string

      @ApiProperty()
      @IsString()
      temperature?: string

      @ApiProperty()
      @IsNumber()
      workersAmount?: number

      @ApiProperty()
      @IsNumber()
      ItrAmount?: number

      @ApiProperty()
      @IsBoolean()
      hasProblems?: boolean

      @IsString()
      @ApiProperty()
      additional?: string

      @ApiProperty()
      @IsBoolean()
      hasAdditional?: boolean
}
