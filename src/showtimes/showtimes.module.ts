import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowTimesService } from './showtimes.service';
import { ShowTimesController } from './showtimes.controller';
import { ShowTime } from './showtime.entity';
import { Movie } from '../movies/movie.entity'; // Ensure this import exists
import { MoviesModule } from '../movies/movies.module'; // Import MoviesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([ShowTime]), // Ensure ShowTime entity is registered
    MoviesModule, // Import MoviesModule so it provides MovieRepository
  ],
  controllers: [ShowTimesController],
  providers: [ShowTimesService],
})
export class ShowTimesModule {}
