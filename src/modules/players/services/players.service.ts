import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PlayersService {
  constructor(@Inject('PLAYERS_DATA') private readonly players: any[]) {}


  // Retourne tous les joueurs triés par classement (rank)
  findAll() {
    return [...this.players].sort((a, b) => a.data.rank - b.data.rank);
  }

  // Retourne un joueur par ID
  findOne(id: number) {
    return this.players.find((player) => player.id === id);
  }
}
