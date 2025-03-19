import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  // This marks it as a database table
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  duration: number;  // Duration in minutes

  @Column()
  rating: string;  // Example: PG-13, R

  @Column()
  release_year: number;
}
