import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './tickets.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TicketService', () => {
  let service: TicketService;
  let repository: Repository<Ticket>;

  const mockTicketRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((ticket) => Promise.resolve({ id: 1, ...ticket })),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getRepositoryToken(Ticket),
          useValue: mockTicketRepository,
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    repository = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a ticket successfully', async () => {
    mockTicketRepository.findOne.mockResolvedValue(null);

    const ticketData = { showTime: { id: 1 }, seatNumber: 'A1', customerName: 'John Doe' };
    const result = await service.create(ticketData as any);

    expect(result).toEqual({ id: 1, ...ticketData });
    expect(repository.create).toHaveBeenCalledWith(ticketData);
    expect(repository.save).toHaveBeenCalledWith(ticketData);
  });

  it('should not create a duplicate ticket for the same seat and showtime', async () => {
    mockTicketRepository.findOne.mockResolvedValue({ id: 1 });

    const ticketData = { showTime: { id: 1 }, seatNumber: 'A1', customerName: 'John Doe' };

    await expect(service.create(ticketData as any)).rejects.toThrow(BadRequestException);
  });

  it('should find a ticket by id', async () => {
    mockTicketRepository.findOne.mockResolvedValue({ id: 1, seatNumber: 'A1' });

    const result = await service.findOne(1);

    expect(result).toEqual({ id: 1, seatNumber: 'A1' });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if ticket not found', async () => {
    mockTicketRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a ticket', async () => {
    mockTicketRepository.findOne.mockResolvedValue({ id: 1 });

    await service.delete(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when deleting a non-existent ticket', async () => {
    mockTicketRepository.findOne.mockResolvedValue(null);

    await expect(service.delete(999)).rejects.toThrow(NotFoundException);
  });
});
