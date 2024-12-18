import { Injectable } from '@nestjs/common';
import { players } from '../../../data/players.data';

@Injectable()
export class PlayersService {
  // Retourne tous les joueurs triés par classement (rank)
  findAll() {
    return [...players].sort((a, b) => a.data.rank - b.data.rank);
  }

  // Retourne un joueur par ID
  findOne(id: number) {
    return players.find((player) => player.id === id);
  }
}
