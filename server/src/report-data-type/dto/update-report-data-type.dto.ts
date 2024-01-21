import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDataTypeDto } from './create-report-data-type.dto';
import { IsString } from 'class-validator';

export class UpdateReportDataTypeDto extends PartialType(CreateReportDataTypeDto) {
      @IsString()
      @ApiProperty()
      name: string
}
