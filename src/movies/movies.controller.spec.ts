import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  const mockMoviesService = {
    findAll: jest.fn(() => [{ id: 1, title: 'Movie 1' }]),
    findOne: jest.fn((id) => ({ id, title: `Movie ${id}` })),
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

  it('should return movies', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, title: 'Movie 1' }]);
  });

  it('should return a single movie', async () => {
    expect(await controller.findOne(1)).toEqual({ id: 1, title: 'Movie 1' });
  });
});
