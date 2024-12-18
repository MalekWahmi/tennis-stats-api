import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from '../services/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly StatsService: StatsService) {}
}
