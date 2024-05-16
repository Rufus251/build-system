import { Module } from '@nestjs/common';
import { WorkDoneService } from './work-done.service';
import { WorkDoneController } from './work-done.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkDoneController],
  providers: [WorkDoneService],
})
export class WorkDoneModule {}
