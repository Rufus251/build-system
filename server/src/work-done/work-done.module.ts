import { Module } from '@nestjs/common';
import { WorkDoneService } from './work-done.service';
import { WorkDoneController } from './work-done.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports: [DatabaseModule,JwtModule.register({
    secret: env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [WorkDoneController],
  providers: [WorkDoneService],
})
export class WorkDoneModule {}
