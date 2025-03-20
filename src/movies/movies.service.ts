import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  // Create a new movie
  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  // Get all movies
  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  // Get a movie by ID
  async findOne(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne({ where: { id } });
  }

  // Update movie details
  async update(id: number, movieData: Partial<Movie>): Promise<Movie> {
    await this.movieRepository.update(id, movieData);
    return this.findOne(id);
  }

  // Delete a movie
  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
