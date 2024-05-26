import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkDoneDto } from './create-work-done.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateWorkDoneDto extends PartialType(CreateWorkDoneDto) {
      @ApiProperty()
      @IsDateString()
      @IsOptional()
      doneDate?: Date
}
