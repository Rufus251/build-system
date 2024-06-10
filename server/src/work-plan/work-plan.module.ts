import { Module } from '@nestjs/common';
import { WorkPlanService } from './work-plan.service';
import { WorkPlanController } from './work-plan.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [WorkPlanController],
  providers: [WorkPlanService],
})
export class WorkPlanModule {}
