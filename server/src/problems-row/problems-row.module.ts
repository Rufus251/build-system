import { Module } from '@nestjs/common';
import { ProblemsRowService } from './problems-row.service';
import { ProblemsRowController } from './problems-row.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProblemsRowController],
  providers: [ProblemsRowService],
})
export class ProblemsRowModule {}
