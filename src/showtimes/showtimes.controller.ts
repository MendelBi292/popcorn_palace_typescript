import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShowTimesService } from './showtimes.service';
import { ShowTime } from './showtime.entity';

@Controller('showtimes')
export class ShowTimesController {
  constructor(private readonly showTimesService: ShowTimesService) {}

  @Post()
  create(@Body() showtimeData: Partial<ShowTime>): Promise<ShowTime> {
    return this.showTimesService.create(showtimeData);
  }

  @Get()
  findAll(): Promise<ShowTime[]> {
    return this.showTimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ShowTime | null> {
    return this.showTimesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() showtimeData: Partial<ShowTime>): Promise<ShowTime> {
    return this.showTimesService.update(id, showtimeData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.showTimesService.remove(id);
  }
}
