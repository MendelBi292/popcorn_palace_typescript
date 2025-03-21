import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesService } from './showtimes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowTime } from './showtime.entity';
import { Repository } from 'typeorm';

describe('ShowTimesService', () => {
  let service: ShowTimesService;
  let showTimeRepository: Repository<ShowTime>;

  // Mock repository for ShowTimes
  const mockShowTimeRepository = {
    findOne: jest.fn().mockImplementation((query) => {
      // Simulating a case where no overlapping showtime exists (so validation passes)
      if (query.where?.id) {
        return Promise.resolve({
          id: 1,
          movie: { id: 1, title: "Test Movie" },
          startTime: new Date(),
        });
      }
      return Promise.resolve(null); // Ensure no overlapping showtime is found
    }),
    create: jest.fn().mockImplementation((showtimeData) => ({ ...showtimeData, id: 1 })),
    save: jest.fn().mockImplementation((showtime) => Promise.resolve(showtime)),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowTimesService,
        {
          provide: getRepositoryToken(ShowTime), // Inject repository mock
          useValue: mockShowTimeRepository,
        },
      ],
    }).compile();

    service = module.get<ShowTimesService>(ShowTimesService);
    showTimeRepository = module.get<Repository<ShowTime>>(getRepositoryToken(ShowTime));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a showtime', async () => {
    const newShowtime = {
      movie: { id: 1, title: "Mock Movie" }, // Simulating the relation
      startTime: new Date(),
    };
  
    const expectedShowtime = { ...newShowtime, id: 1 }; // Ensure id is included in expectation
  
    const result = await service.create(newShowtime as any);
    expect(result).toEqual(expectedShowtime);
    expect(showTimeRepository.save).toHaveBeenCalledWith(expect.objectContaining(newShowtime));
  });  
  
  it('should find a showtime by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      movie: { id: 1, title: "Test Movie" },
      startTime: expect.any(Date),
    });
    expect(showTimeRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});


// import { Test, TestingModule } from '@nestjs/testing';
// import { ShowTimesService } from './showtimes.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { ShowTime } from './showtime.entity';
// import { Repository } from 'typeorm';
// import { Movie } from '../movies/movie.entity';

// describe('ShowTimesService', () => {
//   let service: ShowTimesService;
//   let repo: Repository<ShowTime>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ShowTimesService,
//         {
//           provide: getRepositoryToken(ShowTime),
//           useClass: Repository, // Mock repository
//         },
//       ],
//     }).compile();

//     service = module.get<ShowTimesService>(ShowTimesService);
//     repo = module.get<Repository<ShowTime>>(getRepositoryToken(ShowTime));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should create a showtime', async () => {
//     const movie: Movie = {
//       id: 1,
//       title: 'Test Movie',
//       genre: 'Action',
//       duration: 120,
//       rating: 'PG-13',
//       release_year: 2024,
//     };

//     const showtime: Partial<ShowTime> = {
//       id: 1,
//       movie: movie,  // Provide a valid Movie entity
//       theater: 'Cinema 1',
//       start_time: new Date('2025-03-19T14:00:00.000Z'),
//       end_time: new Date('2025-03-19T16:00:00.000Z'),
//       price: 12.5,
//     };

//     jest.spyOn(repo, 'create').mockReturnValue(showtime as ShowTime);
//     jest.spyOn(repo, 'save').mockResolvedValue(showtime as ShowTime);

//     expect(await service.create(showtime as ShowTime)).toEqual(showtime);
//   });
// });
