import { Module } from '@nestjs/common';
import { ProblemsRowService } from './problems-row.service';
import { ProblemsRowController } from './problems-row.controller';
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
  controllers: [ProblemsRowController],
  providers: [ProblemsRowService],
})
export class ProblemsRowModule {}
