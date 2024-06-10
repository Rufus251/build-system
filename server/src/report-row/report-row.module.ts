import { Module } from '@nestjs/common';
import { ReportRowService } from './report-row.service';
import { ReportRowController } from './report-row.controller';
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
  controllers: [ReportRowController],
  providers: [ReportRowService],
})
export class ReportRowModule {}
