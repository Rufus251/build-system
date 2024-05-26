import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdditionalWorksNameDto } from './create-additional-works-name.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAdditionalWorksNameDto extends PartialType(CreateAdditionalWorksNameDto) {
      @IsString()
      @ApiProperty()
      @IsOptional()
      name?: string

      @IsString()
      @ApiProperty()
      @IsOptional()
      unit?: string

      @IsNumber()
      @ApiProperty()
      @IsOptional()
      total?: number
}
