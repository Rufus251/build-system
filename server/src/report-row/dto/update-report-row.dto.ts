import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportRowDto } from './create-report-row.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateReportRowDto{
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
