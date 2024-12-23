import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../services/stats.service';
import { StatsDto } from '../dto/stats.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // GET /stats/ratio : Retourne le pays avec le meilleur ratio
  @Get('ratio')
  getCountryWithBestWinRatio(): StatsDto {
    return this.statsService.getCountryWithBestWinRatio();
  }
  // GET /stats/bmi : Retourne la moyenne de l'IMC des joueurs
  @Get('bmi')
  getAverageBMI(): Promise<number> {
    return this.statsService.getAverageBMI();
  }

  // GET /stats/median-height : Retourne la médiane de la taille des joueurs
  @Get('median-height')
  getMedianHeight(): Promise<number> {
    return this.statsService.getMedianHeight();
  }
}
