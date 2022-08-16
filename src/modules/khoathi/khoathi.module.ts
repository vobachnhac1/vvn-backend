import { Module } from '@nestjs/common';
import { KhoathiController } from './khoathi.controller';
import { KhoathiRepository } from './khoathi.repository';
import { KhoathiService } from './khoathi.service';

@Module({
  imports: [],
  controllers: [KhoathiController],
  providers: [KhoathiService, KhoathiRepository],
})
export class KhoathiModule {}
