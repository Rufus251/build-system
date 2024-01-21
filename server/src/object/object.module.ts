import { Module } from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ObjectController],
  providers: [ObjectService],
})
export class ObjectModule {}
