import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  duration: number;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'int', nullable: false, default: 2000 }) 
  releaseYear: number;
}
