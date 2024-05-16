import { Module } from '@nestjs/common';
import { AdditionalWorksNameService } from './additional-works-name.service';
import { AdditionalWorksNameController } from './additional-works-name.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdditionalWorksNameController],
  providers: [AdditionalWorksNameService],
})
export class AdditionalWorksNameModule {}
