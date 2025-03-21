import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesController } from './showtimes.controller';
import { ShowTimesService } from './showtimes.service';
import { ShowTime } from './showtime.entity';

describe('ShowTimesController', () => {
  let controller: ShowTimesController;
  let service: ShowTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowTimesController],
      providers: [
        {
          provide: ShowTimesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShowTimesController>(ShowTimesController);
    service = module.get<ShowTimesService>(ShowTimesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a showtime', async () => {
    const showtime: ShowTime = {
      id: 1,
      movie: { id: 1, title: 'Test Movie' } as any,
      theater: 'Cinema 1',
      start_time: new Date('2025-03-19T14:00:00.000Z'),
      end_time: new Date('2025-03-19T16:00:00.000Z'),
      price: 12.5,
    };

    jest.spyOn(service, 'create').mockResolvedValue(showtime);
    expect(await controller.create(showtime)).toEqual(showtime);
  });
});
