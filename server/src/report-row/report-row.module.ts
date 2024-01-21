import { Module } from '@nestjs/common';
import { ReportRowService } from './report-row.service';
import { ReportRowController } from './report-row.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportRowController],
  providers: [ReportRowService],
})
export class ReportRowModule {}
