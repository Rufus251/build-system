import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportRowDto } from './create-report-row.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReportRowDto {
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  planNumberOfFloor?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  planQuantityPerFloor?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  planTotal?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  factNumberOfFloor?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  factQuantityPerFloor?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  factTotal?: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  room?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  brigade?: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  workersAmount?: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  comment?: string;
}
