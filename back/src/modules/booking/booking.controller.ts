import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('booking')
@ApiTags('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('seeder')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED, //201
    description: `${HttpStatus.CREATED}: Users database seeded initializer (15 users, 4 admins).`,
  })
  seeder() {
    return this.bookingService.seeder();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.bookingService.create(createBookingDto);
      return booking;
    } catch (error) {
      throw new HttpException(
        `Booking not created. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const bookings = await this.bookingService.findAll();
      return bookings;
    } catch (error) {
      throw new HttpException(
        `Bookings not found. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('byID/:idUser/:idEvent')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('idUser') idUser: string,
    @Param('idEvent') idEvent: string,
  ) {
    try {
      const booking = await this.bookingService.findOne(+idUser, +idEvent);
      if (!booking) {
        throw new Error(
          `Booking not found for user ${idUser} and event ${idEvent}`,
        );
      }
      return booking;
    } catch (error) {
      throw new HttpException(
        `Booking not found. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('byEvent/:idEvent')
  @HttpCode(HttpStatus.OK)
  async findOneByEvent(@Param('idEvent') idEvent: string) {
    try {
      const booking = await this.bookingService.findOneByEvent(+idEvent);
      if (!booking) {
        throw new Error(`Booking not found for event ${idEvent}`);
      }
      return booking;
    } catch (error) {
      throw new HttpException(
        `Booking not found. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('byUser/:idUser')
  @HttpCode(HttpStatus.OK)
  async findOneByUser(@Param('idUser') idUser: string) {
    try {
      const booking = await this.bookingService.findOneByUser(+idUser);
      if (!booking) {
        throw new Error(`Booking not found for user ${idUser}`);
      }
      return booking;
    } catch (error) {
      throw new HttpException(
        `Booking not found. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
	*/
}
