import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdditionalWorksNameDto } from './create-additional-works-name.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateAdditionalWorksNameDto extends PartialType(CreateAdditionalWorksNameDto) {
      @IsString()
      @ApiProperty()
      name: string

      @IsString()
      @ApiProperty()
      unit: string

      @IsNumber()
      @ApiProperty()
      total: number
}
