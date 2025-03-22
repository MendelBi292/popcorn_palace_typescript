import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(movieData: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async updateByTitle(title: string, movieData: UpdateMovieDto): Promise<Movie | null> {
    const movie = await this.movieRepository.findOne({ where: { title } });
    if (!movie) throw new NotFoundException(`Movie with title ${title} not found`);
    await this.movieRepository.update({ title }, movieData);
    return this.movieRepository.findOne({ where: { title } });
  }

  async removeByTitle(title: string): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { title } });
    if (!movie) throw new NotFoundException(`Movie with title ${title} not found`);
    await this.movieRepository.delete({ title });
  }
}
