import { Module } from '@nestjs/common';
import { PlayersController } from './controller/players.controller';
import { PlayersService } from './services/players.service';
import { mockPlayers } from 'src/data/players.data';

@Module({
    imports:[],
  controllers: [PlayersController],
  providers: [PlayersService,
    {
    provide: 'PLAYERS_DATA',
    useValue: mockPlayers,
  },],
})
export class PlayersModule {}
