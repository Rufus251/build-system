import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsString } from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
      @IsString()
      @ApiProperty()
      additional: string
}
