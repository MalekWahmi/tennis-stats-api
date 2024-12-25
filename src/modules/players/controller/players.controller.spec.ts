import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from '../services/players.service';

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersService: PlayersService;
   const mockPlayers = [
    {
        "id": 52,
        "firstname": "Novak",
        "lastname": "Djokovic",
        "shortname": "N.DJO",
        "sex": "M",
        "country": {
          "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
          "code": "SRB"
        },
        "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
        "data": {
          "rank": 2,
          "points": 2542,
          "weight": 80000,
          "height": 188,
          "age": 31,
          "last": [1, 1, 1, 1, 1]
        }
      },
      {
        "id": 95,
        "firstname": "Venus",
        "lastname": "Williams",
        "shortname": "V.WIL",
        "sex": "F",
        "country": {
          "picture": "https://data.latelier.co/training/tennis_stats/resources/USA.png",
          "code": "USA"
        },
        "picture": "https://data.latelier.co/training/tennis_stats/resources/Venus.webp",
        "data": {
          "rank": 52,
          "points": 1105,
          "weight": 74000,
          "height": 185,
          "age": 38,
          "last": [0, 1, 0, 0, 1]
        }
      },
      {
        "id": 65,
        "firstname": "Stan",
        "lastname": "Wawrinka",
        "shortname": "S.WAW",
        "sex": "M",
        "country": {
          "picture": "https://data.latelier.co/training/tennis_stats/resources/Suisse.png",
          "code": "SUI"
        },
        "picture": "https://data.latelier.co/training/tennis_stats/resources/Wawrinka.png",
        "data": {
          "rank": 21,
          "points": 1784,
          "weight": 81000,
          "height": 183,
          "age": 33,
          "last": [1, 1, 1, 0, 1]
        }
      },
      {
        "id": 102,
        "firstname": "Serena",
        "lastname": "Williams",
        "shortname": "S.WIL",
        "sex": "F",
        "country": {
          "picture": "https://data.latelier.co/training/tennis_stats/resources/USA.png",
          "code": "USA"
        },
        "picture": "https://data.latelier.co/training/tennis_stats/resources/Serena.png",
        "data": {
          "rank": 10,
          "points": 3521,
          "weight": 72000,
          "height": 175,
          "age": 37,
          "last": [0, 1, 1, 1, 0]
        }
      },
      {
        "id": 17,
        "firstname": "Rafael",
        "lastname": "Nadal",
        "shortname": "R.NAD",
        "sex": "M",
        "country": {
          "picture": "https://data.latelier.co/training/tennis_stats/resources/Espagne.png",
          "code": "ESP"
        },
        "picture": "https://data.latelier.co/training/tennis_stats/resources/Nadal.png",
        "data": {
          "rank": 1,
          "points": 1982,
          "weight": 85000,
          "height": 185,
          "age": 33,
          "last": [1, 0, 0, 0, 1]
        }
      }
    ]
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        PlayersService,
        {
          provide: PlayersService,
          useValue: {
            findAll: jest.fn().mockReturnValue(mockPlayers), 
            findOne: jest.fn().mockReturnValue(mockPlayers[0]), 
          },
        },
      ],
    }).compile();

    playersController = app.get<PlayersController>(PlayersController);
    playersService = app.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersController).toBeDefined();
  });

  describe('getAllPlayers', () => {
    it('should return an array of players', async () => {
      const result = await playersController.getAllPlayers();
      expect(result).toEqual(mockPlayers);  // Compare with mock data
    });
  });

  describe('getPlayerById', () => {
    it('should return a single player', async () => {
      const result = await playersController.getPlayerById('1');
      expect(result).toEqual(mockPlayers[0]); 
    });
  });
});
