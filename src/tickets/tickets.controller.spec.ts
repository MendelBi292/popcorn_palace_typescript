import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './tickets.controller';
import { TicketService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  const mockTicketService = {
    bookTicket: jest.fn(dto => Promise.resolve({ bookingId: 'uuid-1234' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [{ provide: TicketService, useValue: mockTicketService }],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should book a ticket', async () => {
    const dto: CreateTicketDto = { showtimeId: 1, seatNumber: 15, userId: '84438967-f68f-4fa0-b620-0f08217e76af' };
    const result = await controller.book(dto);
    expect(result).toEqual({ bookingId: 'uuid-1234' });
    expect(service.bookTicket).toHaveBeenCalledWith(dto);
  });
});
