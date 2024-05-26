import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResidentialComplexDto } from './create-residential-complex.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateResidentialComplexDto extends PartialType(
  CreateResidentialComplexDto,
) {
  @IsString()
  @ApiProperty()
  @IsOptional()
  name?: string;
}
