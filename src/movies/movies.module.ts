import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])], // Register Movie entity
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
