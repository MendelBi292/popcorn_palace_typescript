import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { ShowTime } from '../showtimes/showtime.entity';

@Entity()
@Unique(['showTime', 'seatNumber']) // Ensures no duplicate seat bookings for the same showtime
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ShowTime, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'showtime_id' })
  showTime: ShowTime;

  @Column()
  seatNumber: number;

  @Column()
  userId: string;
}
