import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkDoneDto } from './create-work-done.dto';
import { IsDateString } from 'class-validator';

export class UpdateWorkDoneDto extends PartialType(CreateWorkDoneDto) {
      @ApiProperty()
      @IsDateString()
      doneDate: Date
}
