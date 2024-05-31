import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  workType?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  workDate?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  weather?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  temperature?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  workersAmount?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  ItrAmount?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasProblems?: boolean;

  @IsString()
  @ApiProperty()
  @IsOptional()
  additional?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasAdditional?: boolean;
}
