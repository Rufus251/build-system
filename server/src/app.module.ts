import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ObjectModule } from './object/object.module';
import { ReportModule } from './report/report.module';
import { ReportRowModule } from './report-row/report-row.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, ObjectModule, ReportModule, ReportRowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
