import { Module } from '@nestjs/common';
import { ReportDataTypeService } from './report-data-type.service';
import { ReportDataTypeController } from './report-data-type.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportDataTypeController],
  providers: [ReportDataTypeService],
})
export class ReportDataTypeModule {}
