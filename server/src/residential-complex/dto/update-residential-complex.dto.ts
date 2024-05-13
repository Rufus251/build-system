import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResidentialComplexDto } from './create-residential-complex.dto';
import { IsString } from 'class-validator';

export class UpdateResidentialComplexDto extends PartialType(CreateResidentialComplexDto) {
      @IsString()
      @ApiProperty()
      name: string
}
