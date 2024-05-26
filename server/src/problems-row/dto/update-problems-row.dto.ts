import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProblemsRowDto } from './create-problems-row.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProblemsRowDto extends PartialType(CreateProblemsRowDto) {
  @IsString()
  @ApiProperty()
  @IsOptional()
  description?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  takenMeasures?: string;
}
