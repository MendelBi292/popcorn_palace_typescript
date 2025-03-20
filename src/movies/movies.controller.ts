import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() movieData: Partial<Movie>): Promise<Movie> {
    return this.moviesService.create(movieData);
  }

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Movie | null> {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() movieData: Partial<Movie>): Promise<Movie> {
    return this.moviesService.update(id, movieData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.moviesService.remove(id);
  }
}
