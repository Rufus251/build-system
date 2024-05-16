import { Module } from '@nestjs/common';
import { MainWorksNameService } from './main-works-name.service';
import { MainWorksNameController } from './main-works-name.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MainWorksNameController],
  providers: [MainWorksNameService],
})
export class MainWorksNameModule {}
