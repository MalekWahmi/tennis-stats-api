import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PlayersService {
  constructor(@Inject('PLAYERS_DATA') private readonly players: any[]) {}


  
  // Calculer l'IMC d'un joueur
  calculateBMI(weight: number, height: number): number {
    return weight / (height * height);
  }

  // Calculer l'IMC moyen de tous les joueurs
  calculateAverageBMI(): number {
    const totalBMI = this.players.reduce((acc, player) => {
      const bmi = this.calculateBMI(player.weight, player.height);
      return acc + bmi;
    }, 0);

    return totalBMI / this.players.length;
  }

  // Retourne tous les joueurs triés par classement (rank)
  findAll() {
    return [...this.players].sort((a, b) => a.data.rank - b.data.rank);
  }

  // Retourne un joueur par ID
  findOne(id: number) {
    return this.players.find((player) => player.id === id);
  }
}
