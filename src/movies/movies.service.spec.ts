import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository, // Mock repository
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
