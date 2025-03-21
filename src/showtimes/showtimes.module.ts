import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowTimesService } from './showtimes.service';
import { ShowTimesController } from './showtimes.controller';
import { ShowTime } from './showtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShowTime])],
  providers: [ShowTimesService],
  controllers: [ShowTimesController],
})
export class ShowTimesModule {}
