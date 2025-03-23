import { IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  showtimeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  seatNumber: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
