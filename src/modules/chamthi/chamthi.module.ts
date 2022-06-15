import { Module } from '@nestjs/common';
import { ChamThiController } from './chamthi.controller';
import { ChamThiRepository } from './chamthi.repository';
import { ChamThiService } from './chamthi.service';

@Module({
  imports: [],
  controllers: [ChamThiController],
  providers: [ChamThiService, ChamThiRepository]
})
export class ChamThiModule { }
