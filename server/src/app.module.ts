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
import { ResidentialComplexModule } from './residential-complex/residential-complex.module';
import { SmetaModule } from './smeta/smeta.module';
import { MainWorksNameModule } from './main-works-name/main-works-name.module';
import { AdditionalWorksNameModule } from './additional-works-name/additional-works-name.module';
import { WorkDoneModule } from './work-done/work-done.module';
import { WorkPlanModule } from './work-plan/work-plan.module';
import { ProblemsModule } from './problems/problems.module';
import { ProblemsRowModule } from './problems-row/problems-row.module';
import * as path from 'path';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ResidentialComplexModule,
    ObjectModule,
    SmetaModule,
    MainWorksNameModule,
    AdditionalWorksNameModule,
    ReportModule,
    WorkDoneModule,
    WorkPlanModule,
    ReportRowModule,
    ProblemsModule,
    ProblemsRowModule,
    JwtModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
