import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { TicketService } from './tickets.service';
import { TicketController } from './tickets.controller';
import { ShowTime } from '../showtimes/showtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, ShowTime])],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
