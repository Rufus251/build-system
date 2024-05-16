import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMainWorksNameDto } from './create-main-works-name.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateMainWorksNameDto extends PartialType(CreateMainWorksNameDto) {
      @IsString()
      @ApiProperty()
      name: string

      @IsString()
      @ApiProperty()
      unit: string

      @IsNumber()
      @ApiProperty()
      maxValue: number

      @IsNumber()
      @ApiProperty()
      done: number

      @IsNumber()
      @ApiProperty()
      left: number
}
