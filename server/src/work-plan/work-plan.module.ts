import { Module } from '@nestjs/common';
import { WorkPlanService } from './work-plan.service';
import { WorkPlanController } from './work-plan.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [WorkPlanController],
  providers: [WorkPlanService],
})
export class WorkPlanModule {}
