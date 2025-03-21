import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, Index } from 'typeorm';
import { ShowTime } from '../showtimes/showtime.entity';

@Entity()
@Unique(['showTime', 'seatNumber']) // Ensures no duplicate seat bookings for the same showtime
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShowTime, { onDelete: 'CASCADE', eager: true }) // No inverse relation
  @Index() // Improves query performance
  showTime: ShowTime;

  @Column()
  seatNumber: string;

  @Column({ length: 100 }) // Prevents excessively long names
  customerName: string;

  @Column({ default: false })
  isPaid: boolean;
}
