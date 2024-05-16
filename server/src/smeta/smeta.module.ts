import { Module } from '@nestjs/common';
import { SmetaService } from './smeta.service';
import { SmetaController } from './smeta.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SmetaController],
  providers: [SmetaService],
})
export class SmetaModule {}
