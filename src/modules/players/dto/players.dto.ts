// src/modules/players/dto/player.dto.ts

import { IsString, IsNumber, IsObject, ValidateNested, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class CountryDto {
  @IsString()
  picture: string;

  @IsString()
  code: string;
}

class DataDto {
  @IsNumber()
  rank: number;

  @IsNumber()
  points: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsNumber()
  age: number;

  @IsArray()
  @ArrayNotEmpty()
  last: number[];
}

export class PlayerDto {
  @IsNumber()
  id: number;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  shortname: string;

  @IsString()
  sex: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CountryDto)
  country: CountryDto;

  @IsString()
  picture: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DataDto)
  data: DataDto;
}
