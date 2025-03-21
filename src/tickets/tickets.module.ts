import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './tickets.service';
import { TicketController } from './tickets.controller';
import { Ticket } from './ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])], // Registers Ticket entity with TypeORM
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService], // Allows other modules to use this service
})
export class TicketModule {}
