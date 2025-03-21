import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesService } from './showtimes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowTime } from './showtime.entity';
import { Repository } from 'typeorm';
import { Movie } from '../movies/movie.entity';

describe('ShowTimesService', () => {
  let service: ShowTimesService;
  let repo: Repository<ShowTime>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowTimesService,
        {
          provide: getRepositoryToken(ShowTime),
          useClass: Repository, // Mock repository
        },
      ],
    }).compile();

    service = module.get<ShowTimesService>(ShowTimesService);
    repo = module.get<Repository<ShowTime>>(getRepositoryToken(ShowTime));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a showtime', async () => {
    const movie: Movie = {
      id: 1,
      title: 'Test Movie',
      genre: 'Action',
      duration: 120,
      rating: 'PG-13',
      release_year: 2024,
    };

    const showtime: Partial<ShowTime> = {
      id: 1,
      movie: movie,  // Provide a valid Movie entity
      theater: 'Cinema 1',
      start_time: new Date('2025-03-19T14:00:00.000Z'),
      end_time: new Date('2025-03-19T16:00:00.000Z'),
      price: 12.5,
    };

    jest.spyOn(repo, 'create').mockReturnValue(showtime as ShowTime);
    jest.spyOn(repo, 'save').mockResolvedValue(showtime as ShowTime);

    expect(await service.create(showtime as ShowTime)).toEqual(showtime);
  });
});
