import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesController } from './showtimes.controller';
import { ShowTimesService } from './showtimes.service';

describe('ShowTimesController', () => {
  let controller: ShowTimesController;
  let service: ShowTimesService;

  const mockShowTimesService = {
    create: jest.fn(dto =>
      Promise.resolve({
        id: 1,
        ...dto,
        movie: { id: dto.movieId, title: 'Sample Movie' },
      })
    ),
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          price: 20.2,
          theater: 'Sample Theater',
          startTime: new Date('2025-02-14T11:47:46.125Z'),
          endTime: new Date('2025-02-14T14:47:46.125Z'),
          movie: { id: 1, title: 'Sample Movie' },
        },
      ])
    ),
    findOne: jest.fn(id =>
      Promise.resolve({
        id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: new Date('2025-02-14T11:47:46.125Z'),
        endTime: new Date('2025-02-14T14:47:46.125Z'),
        movie: { id: 1, title: 'Sample Movie' },
      })
    ),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // Reset mock calls between tests

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowTimesController],
      providers: [{ provide: ShowTimesService, useValue: mockShowTimesService }],
    }).compile();

    controller = module.get<ShowTimesController>(ShowTimesController);
    service = module.get<ShowTimesService>(ShowTimesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a showtime', async () => {
    const dto = {
      movieId: 1,
      price: 20.2,
      theater: 'Sample Theater',
      startTime: new Date('2025-02-14T11:47:46.125Z'),
      endTime: new Date('2025-02-14T14:47:46.125Z'),
    };

    const result = await controller.create(dto);
    expect(result).toEqual({
      id: 1,
      ...dto,
      movie: { id: 1, title: 'Sample Movie' },
    });
  });

  it('should return all showtimes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        id: 1,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: expect.any(Date),
        endTime: expect.any(Date),
        movie: { id: 1, title: 'Sample Movie' },
      },
    ]);
  });

  it('should return a showtime by id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      price: 20.2,
      theater: 'Sample Theater',
      startTime: expect.any(Date),
      endTime: expect.any(Date),
      movie: { id: 1, title: 'Sample Movie' },
    });
  });

  it('should delete a showtime', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
