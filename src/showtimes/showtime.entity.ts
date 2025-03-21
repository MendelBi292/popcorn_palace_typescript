import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity()
@Unique(['theater', 'start_time']) // Prevent exact duplicate showtimes in the same theater
export class ShowTime {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, { eager: true }) // Each showtime belongs to a movie
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column()
  theater: string; // Theater name or ID

  @Column('timestamp')
  start_time: Date;

  @Column('timestamp')
  end_time: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;
}
