import { IsNumber, IsString, IsNotEmpty, IsDateString, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShowtimeDto {
  @IsNotEmpty()
  @IsNumber()
  movieId: number;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  theater: string;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)  // Converts ISO string to Date object
  startTime: Date;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  endTime: Date;
}
