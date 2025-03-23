import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { Expose } from 'class-transformer';

@Entity()
@Unique(['theater', 'startTime']) // Prevent duplicate showtimes in the same theater at the same start time
export class ShowTime {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, { eager: true })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Expose()
  get movieId(): number {
    return this.movie?.id;
  }

  @Column()
  theater: string;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;
}
