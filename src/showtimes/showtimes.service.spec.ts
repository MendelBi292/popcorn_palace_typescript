import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesService } from './showtimes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowTime } from './showtime.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Movie } from '../movies/movie.entity';

describe('ShowTimesService', () => {
  let service: ShowTimesService;
  let repository: Repository<ShowTime>;

  const mockShowTimeRepository = {
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => ({ ...dto, id: 1 })),
    save: jest.fn().mockImplementation(showtime => Promise.resolve(showtime)),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: new Date('2025-02-14T11:47:46.125Z'),
        endTime: new Date('2025-02-14T14:47:46.125Z'),
        movie: { id: 1, title: 'Sample Movie' },
      },
    ]),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockMovieRepository = {
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Movie' }),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // Ensure mocks are reset between tests

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowTimesService,
        { provide: getRepositoryToken(ShowTime), useValue: mockShowTimeRepository },
        { provide: getRepositoryToken(Movie), useValue: mockMovieRepository },
      ],
    }).compile();

    service = module.get<ShowTimesService>(ShowTimesService);
    repository = module.get<Repository<ShowTime>>(getRepositoryToken(ShowTime));
  });

  it('should create a showtime', async () => {
    const dto = {
      movieId: 1,
      price: 20.2,
      theater: 'Sample Theater',
      startTime: new Date('2025-02-14T11:47:46.125405Z'),
      endTime: new Date('2025-02-14T14:47:46.125405Z'),
    };
  
    const result = await service.create(dto);
  
    expect(result).toEqual({
      id: 1,
      price: 20.2,
      theater: 'Sample Theater',
      startTime: new Date('2025-02-14T11:47:46.125405Z'),
      endTime: new Date('2025-02-14T14:47:46.125405Z'),
      movie: { id: 1, title: 'Sample Movie' }, // Keep only the 'movie' object instead of 'movieId'
    });
  });
  

  it('should throw error if overlapping showtime exists', async () => {
    mockShowTimeRepository.findOne.mockResolvedValueOnce({ id: 2 });

    const dto = {
      movieId: 1,
      price: 20.2,
      theater: 'Sample Theater',
      startTime: new Date('2025-02-14T11:47:46.125Z'),
      endTime: new Date('2025-02-14T14:47:46.125Z'),
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should find a showtime by id', async () => {
    const expected = {
      id: 1,
      price: 20.2,
      theater: 'Sample Theater',
      startTime: new Date('2025-02-14T11:47:46.125Z'),
      endTime: new Date('2025-02-14T14:47:46.125Z'),
      movie: { id: 1, title: 'Sample Movie' },
    };

    mockShowTimeRepository.findOne.mockResolvedValueOnce(expected);

    const result = await service.findOne(1);
    expect(result).toEqual(expected);
  });
});
