import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    const existingTicket = await this.ticketRepository.findOne({
      where: { showTime: ticketData.showTime, seatNumber: ticketData.seatNumber },
    });

    if (existingTicket) {
      throw new BadRequestException('Seat already booked for this showtime.');
    }

    const ticket = this.ticketRepository.create(ticketData);
    return this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found.`);
    }
    return ticket;
  }

  async update(id: number, updateData: Partial<Ticket>): Promise<Ticket> {
    await this.findOne(id);
    await this.ticketRepository.update(id, updateData);
    return this.findOne(id); // Return updated ticket
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.ticketRepository.delete(id);
  }
}
