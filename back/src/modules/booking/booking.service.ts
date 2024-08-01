import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { Booking } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async seeder() {
    const bookingsData = fs.readFileSync('src/datainit/booking.json', 'utf8');
    const parseData = JSON.parse(bookingsData);
    const createdBookings = [];
    for (const bookingJson of parseData) {
      try {
        createdBookings.push(await this.create(bookingJson));
      } catch (error) {
        console.log(error);
      }
    }
    return createdBookings;
  }
  async create(createBookingDto: CreateBookingDto) {
    try {
      const fecha = new Date(createBookingDto.date);

      const booking = await this.prisma.booking.create({
        data: {
          TransactionNumber: createBookingDto.transactionNumber,
          Quantity: createBookingDto.quantity,
          Paid: createBookingDto.paid,
          Date: fecha,
          userId: createBookingDto.userId,
          eventsId: createBookingDto.eventsId,
        },
      });
      console.log(booking);

      return booking;
    } catch (error) {
      console.log(error);
      throw new Error(
        'Error en el servicio de creación de reserva. Verifica que no tengas duplicados el usuario y el evento',
      );
    }
  }

  async findAll() {
    try {
      const bookings = await this.prisma.booking.findMany();
      return bookings;
    } catch (error) {
      throw new Error('Error en el servicio de búsqueda.');
    }
  }

  async findOne(idUser: number, idEvent: number) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          userId_eventsId: {
            userId: idUser,
            eventsId: idEvent,
          },
        },
      });
      return booking;
    } catch (error) {
      throw new Error('Error en el servicio de búsqueda.');
    }
  }

  async findOneByUser(idUser: number) {
    try {
      const booking = await this.prisma.booking.findMany({
        where: {
          userId: idUser,
        },
      });
      return booking;
    } catch (error) {
      throw new Error('Error en el servicio de búsqueda.');
    }
  }

  async findOneByEvent(idEvent: number) {
    try {
      const booking = await this.prisma.booking.findMany({
        where: {
          eventsId: idEvent,
        },
      });
      return booking;
    } catch (error) {
      throw new Error('Error en el servicio de búsqueda.');
    }
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
