import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TicketService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('bookings')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  book(@Body() dto: CreateTicketDto): Promise<{ bookingId: string }> {
    return this.ticketService.bookTicket(dto);
  }
}
