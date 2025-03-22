import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;
  const mockMovieRepository = {
    create: jest.fn(dto => dto),
    save: jest.fn(movie => Promise.resolve({ id: 1, ...movie })),
    find: jest.fn(() => Promise.resolve([{ id: 1, title: 'Sample Movie Title', genre: 'Action', duration: 120, rating: 8.7, releaseYear: 2025 }])),
    findOne: jest.fn(({ where: { title } }) => {
      if (title === 'Sample Movie Title') return Promise.resolve({ id: 1, title, genre: 'Action', duration: 120, rating: 8.7, releaseYear: 2025 });
      return Promise.resolve(null);
    }),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, { provide: getRepositoryToken(Movie), useValue: mockMovieRepository }],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should create a movie', async () => {
    const dto = { title: 'Sample Movie Title', genre: 'Action', duration: 120, rating: 8.7, releaseYear: 2025 };
    expect(await service.create(dto)).toEqual({ id: 1, ...dto });
  });

  it('should update a movie by title', async () => {
    const dto = { genre: 'Comedy' };
    expect(await service.updateByTitle('Sample Movie Title', dto)).toEqual({ id: 1, title: 'Sample Movie Title', genre: 'Action', duration: 120, rating: 8.7, releaseYear: 2025 });
  });

  it('should throw NotFoundException when updating a non-existent movie', async () => {
    await expect(service.updateByTitle('Nonexistent', {})).rejects.toThrow(NotFoundException);
  });

  it('should delete a movie by title', async () => {
    await service.removeByTitle('Sample Movie Title');
    expect(mockMovieRepository.delete).toHaveBeenCalledWith({ title: 'Sample Movie Title' });
  });
});
