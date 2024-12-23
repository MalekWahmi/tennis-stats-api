import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { PlayerDto } from '../dto/players.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  // GET /players : Retourne tous les joueurs triés par classement
  @Get()
  getAllPlayers(): PlayerDto[] {
    return this.playersService.findAll();
  }

  // GET /players/:id : Retourne un joueur spécifique
  @Get(':id')
  getPlayerById(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }
}
