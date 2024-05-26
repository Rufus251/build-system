import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSmetaDto } from './create-smeta.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSmetaDto extends PartialType(CreateSmetaDto) {
      @IsString()
      @ApiProperty()
      @IsOptional()
      name?: string
}
