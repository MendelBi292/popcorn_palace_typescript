import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])], // Register Movie entity
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [TypeOrmModule], // <-- This is important so ShowTimesModule can use it
})
export class MoviesModule {}
