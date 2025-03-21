import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowTime } from './showtime.entity';

@Injectable()
export class ShowTimesService {
  constructor(
    @InjectRepository(ShowTime)
    private readonly showTimeRepository: Repository<ShowTime>,
  ) {}

  // Ensure no overlapping showtimes in the same theater
  private async validateShowtime(showtime: Partial<ShowTime>): Promise<void> {
    const overlappingShowtime = await this.showTimeRepository.findOne({
      where: [
        { 
          theater: showtime.theater,
          start_time: showtime.start_time,
        },
      ],
    });

    if (overlappingShowtime) {
      throw new BadRequestException('Overlapping showtime exists for this theater.');
    }
  }

  // Create a new showtime
  async create(showtimeData: Partial<ShowTime>): Promise<ShowTime> {
    await this.validateShowtime(showtimeData);
    const showtime = this.showTimeRepository.create(showtimeData);
    return this.showTimeRepository.save(showtime);
  }

//   // Create a new showtime
//   async create(data: any): Promise<ShowTime> {
//     await this.validateShowtime(showtimeData);
//     const movie = await this.movieRepository.findOne({ where: { id: data.movie } });
//     if (!movie) {
//       throw new Error('Movie not found');
//     }
  
//     const showtime = this.showtimeRepository.create({
//       ...data,
//       movie: movie,  // Assign full movie object
//     });
  
//     return this.showtimeRepository.save(showtime);
//   }

  // Get all showtimes
  async findAll(): Promise<ShowTime[]> {
    return this.showTimeRepository.find();
  }

  // Get a specific showtime by ID
  async findOne(id: number): Promise<ShowTime | null> {
    return this.showTimeRepository.findOne({ where: { id } });
  }

  // Update a showtime
  async update(id: number, showtimeData: Partial<ShowTime>): Promise<ShowTime> {
    await this.validateShowtime(showtimeData);
    await this.showTimeRepository.update(id, showtimeData);
    return this.findOne(id);
  }

  // Delete a showtime
  async remove(id: number): Promise<void> {
    await this.showTimeRepository.delete(id);
  }
}
