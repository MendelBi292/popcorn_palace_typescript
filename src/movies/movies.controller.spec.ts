import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  const mockMoviesService = {
    create: jest.fn(dto => Promise.resolve({ id: 1, ...dto })),
    findAll: jest.fn(() => Promise.resolve([{ id: 1, title: 'Sample Movie Title', genre: 'Action', duration: 120, rating: 8.7, releaseYear: 2025 }])),
    updateByTitle: jest.fn((title, dto) => {
      if (title !== 'Sample Movie Title') throw new Error();
      return Promise.resolve({ id: 1, ...dto });
    }),
    removeByTitle: jest.fn((title) => {
      if (title !== 'Sample Movie Title') throw new Error();
      return Promise.resolve();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: mockMoviesService }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a movie with valid input', async () => {
    const dto = { title: 'Sample Movie Title', genre: 'Action', duration: 120, rating: 8.7, releaseYear: 2025 };
    expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
  });

  it('should update a movie if found', async () => {
    const dto = { genre: 'Comedy' };
    await expect(controller.update('Sample Movie Title', dto)).resolves.toBeUndefined();
  });
});
