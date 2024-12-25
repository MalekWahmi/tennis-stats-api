import { Module } from '@nestjs/common';
import { StatsController } from './controller/stats.controller';
import { StatsService } from './services/stats.service';
import { mockPlayers } from 'src/data/players.data';

@Module({
  controllers: [StatsController],
  providers: [StatsService, 
    {
    provide: 'PLAYERS_DATA',   // Provide PLAYERS_DATA with mockPlayers
    useValue: mockPlayers,     // Use mockPlayers as the value
  },
],
})
export class StatsModule {}
