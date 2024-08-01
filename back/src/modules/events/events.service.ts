import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';

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
        document: createEventDto.document,
        maxseats: createEventDto.maxseats,
        price: createEventDto.price,
        picture: createEventDto.picture,
      },
    });
    return event;
  }

  async findAll() {
    const events = await this.prisma.events.findMany();
    return events;
  }

  async findOne(id: number) {
    try {
      const event = await this.prisma.events.findUnique({
        where: { id },
        include: { bookings: true },
      });
      return event;
    } catch (error) {
      throw new Error('Event not found');
    }
  }

  @HttpCode(HttpStatus.OK)
  async update(id: number, updateEventDto: UpdateEventDto) {
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
      const event = await this.prisma.events.delete({
        where: { id },
      });
      return event;
    } catch (error) {
      throw new Error('Event not found');
    }
  }

  async findDeleted() {
    const events = await this.prisma.events.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { createdAt: 'desc' },
      include: { bookings: true },
    });
    return events;
  }

  async findActive() {
    const events = await this.prisma.events.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { bookings: true },
    });
    return events;
  }
}
