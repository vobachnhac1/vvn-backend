import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  imports: [],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
})
export class TeamModule {}
