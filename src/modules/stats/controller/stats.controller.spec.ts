import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { StatsService } from '../services/stats.service';

describe('StatsController', () => {
  let statsController: StatsController;
  let statsService: StatsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        StatsService,
        {
          provide: StatsService,
          useValue: {
            getCountryWithBestWinRatio: jest.fn().mockReturnValue({
              country: 'SRB',
              winRatio: 1,
            }),
          },
        },
      ],
    }).compile();

    statsController = app.get<StatsController>(StatsController);
    statsService = app.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(statsController).toBeDefined();
  });

  it('should return the country with the best win ratio', () => {
    const result = statsController.getCountryWithBestWinRatio();
    expect(result).toEqual({ country: 'SRB', winRatio: 1 });
  });
});
