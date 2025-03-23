import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './tickets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { ShowTime } from '../showtimes/showtime.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';

describe('TicketService', () => {
  let service: TicketService;
  let ticketRepository: Repository<Ticket>;
  let showTimeRepository: Repository<ShowTime>;

  const mockTicketRepository = {
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(ticket => Promise.resolve({ ...ticket, id: 'uuid-1234' })),
  };

  const mockShowTimeRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: getRepositoryToken(Ticket), useValue: mockTicketRepository },
        { provide: getRepositoryToken(ShowTime), useValue: mockShowTimeRepository },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    ticketRepository = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));
    showTimeRepository = module.get<Repository<ShowTime>>(getRepositoryToken(ShowTime));
    jest.clearAllMocks();
  });

  it('should book a ticket successfully', async () => {
    const dto: CreateTicketDto = { showtimeId: 1, seatNumber: 15, userId: '84438967-f68f-4fa0-b620-0f08217e76af' };
    mockShowTimeRepository.findOne.mockResolvedValue({ id: 1, theater: 'Sample Theater', startTime: new Date(), endTime: new Date() });
    mockTicketRepository.findOne.mockResolvedValue(null);
    const result = await service.bookTicket(dto);
    expect(result).toEqual({ bookingId: 'uuid-1234' });
  });

  it('should throw NotFoundException if showtime does not exist', async () => {
    const dto: CreateTicketDto = { showtimeId: 1, seatNumber: 15, userId: '84438967-f68f-4fa0-b620-0f08217e76af' };
    mockShowTimeRepository.findOne.mockResolvedValue(null);
    await expect(service.bookTicket(dto)).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException if seat is already booked', async () => {
    const dto: CreateTicketDto = { showtimeId: 1, seatNumber: 15, userId: '84438967-f68f-4fa0-b620-0f08217e76af' };
    mockShowTimeRepository.findOne.mockResolvedValue({ id: 1, theater: 'Sample Theater', startTime: new Date(), endTime: new Date() });
    mockTicketRepository.findOne.mockResolvedValue({ id: 'uuid-1234' });
    await expect(service.bookTicket(dto)).rejects.toThrow(BadRequestException);
  });
});
