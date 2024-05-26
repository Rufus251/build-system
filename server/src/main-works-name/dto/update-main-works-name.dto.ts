import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMainWorksNameDto } from './create-main-works-name.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMainWorksNameDto extends PartialType(
  CreateMainWorksNameDto,
) {
  @IsString()
  @ApiProperty()
  @IsOptional()
  name?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  unit?: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  maxValue?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  done?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  left?: number;
}
