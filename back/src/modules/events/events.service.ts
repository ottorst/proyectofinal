import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}
  async seeder() {
    const eventsData = fs.readFileSync('src/datainit/events.json', 'utf8');
    const parseData = JSON.parse(eventsData);
    const createdEvents = [];
    for (const eventJson of parseData) {
      try {
        createdEvents.push(await this.create(eventJson));
      } catch (error) {
        console.log(error);
      }
    }
    return createdEvents;
  }

  async create(createEventDto: CreateEventDto) {
    console.log('CreateEventDto received in create method:', createEventDto);
    const event = await this.prisma.events.create({
      // data: createEventDto,
      data: {
        title: createEventDto.title,
        subtitle: createEventDto.subtitle,
        description: createEventDto.description,
        date: new Date(createEventDto.date),
        location: createEventDto.location,
        // document: createEventDto.document,
        maxseats: createEventDto.maxseats,
        price: createEventDto.price,
        picture: createEventDto.picture,
      },
    });
    return event;
  }

  async findAll() {
    try {
      const events = await this.prisma.events.findMany({
        where: { deletedAt: null },
        orderBy: { date: 'desc' },
      });
      return events;
    } catch (error) {
      throw new Error('Error en el servicio de búsqueda de eventos.');
    }
  }

  async update(id: number, updateEventDto: CreateEventDto) {
    try {
      const event = await this.prisma.events.update({
        where: { id },
        data: updateEventDto,
      });
      return event;
    } catch (error) {
      throw new Error('Event not found');
    }
  }

  async remove(id: number) {
    try {
      const event = await this.prisma.events.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return event;
    } catch (error) {
      throw new Error('Event not found');
    }
  }

  async deleteds() {
    try {
      const events = await this.prisma.events.findMany({
        where: { deletedAt: { not: null } },
        orderBy: { date: 'desc' },
      });
      return events;
    } catch (error) {
      throw new Error(
        'Error en el servicio de búsqueda de eventos eliminados.',
      );
    }
  }

  async findActive() {
    try {
      const events = await this.prisma.events.findMany({
        where: { deletedAt: null },
        orderBy: { date: 'desc' },
      });
      return events;
    } catch (error) {
      console.log(error);
      throw new Error('Error en el servicio de búsqueda de eventos.');
    }
  }

  async findEventsWithBookingsAndUsers() {
    try {
      const events = await this.prisma.events.findMany({
        orderBy: { date: 'desc' },
        include: {
          bookings: {
            include: {
              user: true,
            },
          },
        },
      });
      return events;
    } catch (error) {
      throw new Error('Error en el servicio de búsqueda de eventos.');
    }
  }

  //

  async eventDetailCountingBookingsAndPersons(id: number) {
    console.log('Service: eventDetailCountingBookingsAndPersons', id);

    try {
      const eventWithBookings = await this.prisma.events.findUnique({
        where: { id },
        include: {
          bookings: true,
        },
      });

      console.log('eventWithBookings', eventWithBookings);

      if (!eventWithBookings) {
        throw new Error('Service. Event not found.');
      }

      const totalPersons = eventWithBookings.bookings.reduce(
        (sum, booking) => sum + booking.Quantity,
        0,
      );
      const totalBookings = eventWithBookings.bookings.length;

      // Creamos un nuevo objeto sin modificar el original
      const eventWithCounts = {
        ...eventWithBookings,
        // bookings:
        //   eventWithBookings.bookings.length > 0
        //     ? eventWithBookings.bookings
        //     : [],
        totalPersons,
        totalBookings,
      };

      // Eliminamos la propiedad bookings si no queremos retornarla
      // if (eventWithCounts.bookings.length === 0) {
      //   delete eventWithCounts.bookings;
      // }

      return eventWithCounts;
    } catch (error) {
      console.log('Service General Error: ', error);

      throw new Error(
        'Service General Error, in the event detail counting bookings and persons.',
      );
    }
  }

  async eventsCountingBookingsAndPersons() {
    try {
      const eventsWithBookings = await this.prisma.events.findMany({
        where: { deletedAt: null },
        orderBy: { date: 'desc' },
        include: {
          bookings: true,
        },
      });

      // Calcula la suma de las cantidades de reservas para cada evento
      const eventsWithCounts = eventsWithBookings.map((event) => {
        const totalPersons = event.bookings.reduce(
          (sum, booking) => sum + booking.Quantity,
          0,
        );
        const totalBookings = event.bookings.length;
        event.bookings = null; // elimina los bookings para mostrar a clientes
        return { ...event, totalPersons, totalBookings };
      });

      return eventsWithCounts;
    } catch (error) {
      throw new Error('Error en el servicio de búsqueda de eventos.');
    }
  }

  async findOneByTitle(title: string) {
    try {
      const event = await this.prisma.events.findMany({
        where: { title },
        include: {
          bookings: {
            include: {
              user: true,
            },
          },
        },
      });
      return event;
    } catch (error) {
      throw new Error('Error in service findOne by title');
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.prisma.events.findUnique({
        where: { id },
        include: {
          bookings: {
            include: {
              user: true,
            },
          },
        },
      });
      return event;
    } catch (error) {
      throw new Error('Error in service findOne by id');
    }
  }
}
