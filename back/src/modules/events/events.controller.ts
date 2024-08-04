import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Put,
  HttpCode,
  HttpStatus,
  BadRequestException,
  HttpException,
  UseGuards
} from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IsAdmin } from 'src/decorators/rol/IsAdmin.decorator';
import { RolesGuards } from 'src/guards/role/roles.guard';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';


import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
  
} from '@nestjs/swagger';
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService
  ) {}

  @Get('seeder')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED, //201
    description: `${HttpStatus.CREATED}: Events database seeded initializer (3 events).`,
  })
  seeder() {
    return this.eventsService.seeder();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
 
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createEventDto: CreateEventDto) {
    try {
        const eventCreated = await this.eventsService.create(createEventDto);
        return eventCreated;
      
     
    } catch (err: any) {
      throw new BadRequestException('Error creating an event. ' + err.message);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, //200
    description: `${HttpStatus.OK}: Event list retrieved successfully.`,
    type: [CreateEventDto],
    isArray: true,
  })
  // @ApiBearerAuth()
  // @IsAdmin(true)
  // @UseGuards(AuthGuard, RolesGuards)
  findAll() {
    try {
      return this.eventsService.findAll();
    } catch (error) {
      throw new HttpException(
        `All events error. ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto,
  ) {
    try {
      const event = this.eventsService.findOne(+id);
      if (!event) {
        throw new HttpException('Event not found. ', HttpStatus.NOT_FOUND);
      } else {
        return this.eventsService.update(+id, updateEventDto);
      }
    } catch (error) {
      throw new HttpException(
        'Event not found. ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('id') id: string) {
    try {
      return this.eventsService.remove(+id);
    } catch (error) {
      throw new HttpException(
        `Event not found. ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // @Get('actives')
  // async findActiveEvents() {
  //   try {
  //     return await this.eventsService.findActive();
  //   } catch (error) {
  //     throw new HttpException(
  //       `Events not found. ${error.message}`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  @Get('deleteds')
  @HttpCode(HttpStatus.OK)
  async deletedEvents() {
    try {
      return await this.eventsService.deleteds();
    } catch (error) {
      throw new HttpException(
        `Events not found. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('eventsWithBookingsAndUsers')
  @HttpCode(HttpStatus.OK)
  async findEventsWithBookingsAndUsers() {
    try {
      const events = await this.eventsService.findEventsWithBookingsAndUsers();
      if (!events) {
        throw new Error('Events not found');
      }
      return events;
    } catch (error) {
      throw new HttpException(
        `Events not found. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('eventsCountingBookings')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: `${HttpStatus.OK}: Event list retrieved successfully. Include events, totalPersons, totalBookings, bookings array is null for security reasons.`,
    isArray: true,
  })
  async eventsCountingBookings() {
    try {
      const events =
        await this.eventsService.eventsCountingBookingsAndPersons();
      if (!events) {
        throw new Error('Events not found');
      }
      return events;
    } catch (error) {
      throw new HttpException(
        `eventsCountingBookings. ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('eventDetailCountingBookingsAndPersons/:id')
  @HttpCode(HttpStatus.OK)
  async eventDetailCountingBookingsAndPersons(@Param('id') id: number) {
    console.log('Controller:eventDetailCountingBookingsAndPersons', id);

    try {
      const eventWithBookings =
        await this.eventsService.eventDetailCountingBookingsAndPersons(+id);
      if (!eventWithBookings) {
        throw new Error('Event not found');
      }
      return eventWithBookings;
    } catch (error) {
      throw new HttpException(
        `Controller event detail counting bookings and persons (id: ${id}). ` +
          error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const event = await this.eventsService.findOne(+id);
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    } catch (error) {
      throw new HttpException(
        'Event not found. ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
