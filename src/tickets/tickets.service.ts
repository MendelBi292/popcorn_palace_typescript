import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { ShowTime } from '../showtimes/showtime.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(ShowTime)
    private readonly showTimeRepository: Repository<ShowTime>,
  ) {}

  async bookTicket(dto: CreateTicketDto): Promise<{ bookingId: string }> {
    // Ensure the showtime exists.
    const showTime = await this.showTimeRepository.findOne({ where: { id: dto.showtimeId } });
    if (!showTime) {
      throw new NotFoundException('ShowTime not found');
    }
    // Check for an existing ticket for the same seat and showtime.
    const existing = await this.ticketRepository.findOne({
      where: { showTime, seatNumber: dto.seatNumber },
    });
    if (existing) {
      throw new BadRequestException('Seat already booked for this showtime');
    }
    const ticket = this.ticketRepository.create({
      showTime,
      seatNumber: dto.seatNumber,
      userId: dto.userId,
    });
    const savedTicket = await this.ticketRepository.save(ticket);
    return { bookingId: savedTicket.id };
  }
}
