import { Controller, Get, Post, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShowTimesService } from './showtimes.service';
import { ShowTime } from './showtime.entity';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Controller('showtimes')
export class ShowTimesController {
  constructor(private readonly showTimesService: ShowTimesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() showtimeData: CreateShowtimeDto): Promise<ShowTime> {
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

  @Post('update/:id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(@Param('id') id: number, @Body() showtimeData: UpdateShowtimeDto): Promise<ShowTime> {
    return this.showTimesService.update(id, showtimeData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.showTimesService.remove(id);
  }
}
