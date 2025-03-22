import { Controller, Get, Post, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() movieData: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(movieData);
  }

  @Get('all')
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Post('update/:movieTitle')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(@Param('movieTitle') title: string, @Body() movieData: UpdateMovieDto): Promise<Movie | null> {
    return this.moviesService.updateByTitle(title, movieData);
  }

  @Delete(':movieTitle')
  remove(@Param('movieTitle') title: string): Promise<void> {
    return this.moviesService.removeByTitle(title);
  }
}
