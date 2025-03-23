import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowTime } from './showtime.entity';
import { Movie } from '../movies/movie.entity';

@Injectable()
export class ShowTimesService {
  constructor(
    @InjectRepository(ShowTime)
    private readonly showTimeRepository: Repository<ShowTime>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  private async validateShowtime(showtime: Partial<ShowTime>): Promise<void> {
    const overlapping = await this.showTimeRepository.findOne({
      where: { theater: showtime.theater, startTime: showtime.startTime },
    });
    if (overlapping) {
      throw new BadRequestException('Overlapping showtime exists for this theater.');
    }
  }

  async create(showtimeData: Partial<ShowTime> & { movieId: number }): Promise<ShowTime> {
    const { movieId, ...rest } = showtimeData;
    const movie = await this.movieRepository.findOne({ where: { id: movieId } });
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }
    await this.validateShowtime({ ...rest, theater: rest.theater, startTime: rest.startTime });
    const showtime = this.showTimeRepository.create({ ...rest, movie });
    return this.showTimeRepository.save(showtime);
  }

  async findAll(): Promise<ShowTime[]> {
    return this.showTimeRepository.find();
  }

  async findOne(id: number): Promise<ShowTime | null> {
    return this.showTimeRepository.findOne({ where: { id } });
  }

  async update(id: number, showtimeData: Partial<ShowTime> & { movieId?: number }): Promise<ShowTime> {
    if (showtimeData.movieId) {
      const movie = await this.movieRepository.findOne({ where: { id: showtimeData.movieId } });
      if (!movie) {
        throw new BadRequestException('Movie not found');
      }
      showtimeData = { ...showtimeData, movie };
    }
    await this.validateShowtime(showtimeData);
    await this.showTimeRepository.update(id, showtimeData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.showTimeRepository.delete(id);
  }
}
