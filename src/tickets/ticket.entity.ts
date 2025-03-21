import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { ShowTime } from '../showtimes/showtime.entity';

@Entity()
@Unique(['showTime', 'seatNumber']) // Ensures no duplicate seat bookings for the same showtime
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShowTime, (showTime) => showTime.tickets, { eager: true })
  showTime: ShowTime;

  @Column()
  seatNumber: string;

  @Column()
  customerName: string;

  @Column({ default: false })
  isPaid: boolean;
}
