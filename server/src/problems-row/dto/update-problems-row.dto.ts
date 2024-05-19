import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProblemsRowDto } from './create-problems-row.dto';
import { IsString } from 'class-validator';

export class UpdateProblemsRowDto extends PartialType(CreateProblemsRowDto) {
      @IsString()
      @ApiProperty()
      description: string

      @IsString()
      @ApiProperty()
      takenMeasures: string
}
