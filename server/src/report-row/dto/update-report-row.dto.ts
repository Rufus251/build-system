import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportRowDto } from './create-report-row.dto';
import { IsString } from 'class-validator';

export class UpdateReportRowDto extends PartialType(CreateReportRowDto) {
      @IsString()
      @ApiProperty()
      value: string
}
