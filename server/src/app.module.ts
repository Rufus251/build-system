import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './role/role.module';
import { ObjectModule } from './object/object.module';
import { ReportDataTypeModule } from './report-data-type/report-data-type.module';
import { ReportModule } from './report/report.module';
import { ReportRowModule } from './report-row/report-row.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, RoleModule, ObjectModule, ReportDataTypeModule, ReportModule, ReportRowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
