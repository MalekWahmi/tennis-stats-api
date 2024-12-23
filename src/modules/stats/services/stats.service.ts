import { Injectable, Inject } from '@nestjs/common';
import { PlayerDto } from 'src/modules/players/dto/players.dto';

@Injectable()
export class StatsService {
  constructor(@Inject('PLAYERS_DATA') private readonly players: PlayerDto[]) {}

  getCountryWithBestWinRatio() {
    const countryWinRatios = this.players.reduce((acc, player) => {
      const wins = player.data.last.filter(
        (match: number) => match === 1,
      ).length;
      const totalMatches = player.data.last.length;
      const winRatio = wins / totalMatches;

      if (!acc[player.country.code] || acc[player.country.code] < winRatio) {
        acc[player.country.code] = winRatio;
      }

      return acc;
    }, {});

    const [country, winRatio] = Object.entries(countryWinRatios).reduce(
      (best, current) => (current[1] > best[1] ? current : best),
    );

    return { country, winRatio: Number(winRatio) }; 
  }
  async getAverageBMI(): Promise<number> {
    let totalBMI = 0;
    let playerCount = 0;

    this.players.forEach(player => {
      const heightInMeters = player.data.height / 100; // Convert height from cm to meters
      const bmi = player.data.weight / (heightInMeters * heightInMeters); // BMI calculation
      totalBMI += bmi;
      playerCount++;
    });

    return totalBMI / playerCount; 
  }


  // Calculate the median height (La médiane de la taille des joueurs)
  async getMedianHeight(): Promise<number> {
    const heights = this.players.map(player => player.data.height); // Get an array of player heights
    heights.sort((a, b) => a - b); // Sort the heights in ascending order

    const mid = Math.floor(heights.length / 2);

    // If even number of players, return average of two middle heights
    if (heights.length % 2 === 0) {
      return (heights[mid - 1] + heights[mid]) / 2;
    } else {
      return heights[mid]; // If odd number, return the middle height
    }
  }

}
