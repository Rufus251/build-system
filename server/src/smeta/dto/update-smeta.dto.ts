import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSmetaDto } from './create-smeta.dto';
import { IsString } from 'class-validator';

export class UpdateSmetaDto extends PartialType(CreateSmetaDto) {
      @IsString()
      @ApiProperty()
      name: string
}
