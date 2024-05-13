import { Module } from '@nestjs/common';
import { ResidentialComplexService } from './residential-complex.service';
import { ResidentialComplexController } from './residential-complex.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResidentialComplexController],
  providers: [ResidentialComplexService],
})
export class ResidentialComplexModule {}
