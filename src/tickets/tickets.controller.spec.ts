import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './tickets.controller';
import { TicketService } from './tickets.service';
import { Ticket } from './ticket.entity';

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  const mockTicketService = {
    create: jest.fn((dto) => Promise.resolve({ id: 1, ...dto })),
    findAll: jest.fn(() => Promise.resolve([{ id: 1, seatNumber: 'A1' }])),
    findOne: jest.fn((id) => Promise.resolve({ id, seatNumber: 'A1' })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    delete: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a ticket', async () => {
    const ticketData = { showTime: { id: 1 }, seatNumber: 'A1', customerName: 'John Doe' };
    const result = await controller.create(ticketData as any);

    expect(result).toEqual({ id: 1, ...ticketData });
    expect(service.create).toHaveBeenCalledWith(ticketData);
  });

  it('should get all tickets', async () => {
    const result = await controller.findAll();

    expect(result).toEqual([{ id: 1, seatNumber: 'A1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get a single ticket by id', async () => {
    const result = await controller.findOne(1);

    expect(result).toEqual({ id: 1, seatNumber: 'A1' });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a ticket', async () => {
    const updateData = { seatNumber: 'A2' };
    const result = await controller.update(1, updateData as any);

    expect(result).toEqual({ id: 1, ...updateData });
    expect(service.update).toHaveBeenCalledWith(1, updateData);
  });

  it('should delete a ticket', async () => {
    await controller.delete(1);

    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
