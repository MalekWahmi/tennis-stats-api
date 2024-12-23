import { IsNumber, IsString } from 'class-validator';

export class StatsDto {
  @IsString()
  country: string;

  @IsNumber()
  winRatio: number;
}
