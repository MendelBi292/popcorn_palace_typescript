import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TicketService } from './tickets.service';
import { Ticket } from './ticket.entity';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() ticketData: Partial<Ticket>): Promise<Ticket> {
    return this.ticketService.create(ticketData);
  }

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Ticket>): Promise<Ticket> {
    return this.ticketService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.ticketService.delete(id);
  }
}
