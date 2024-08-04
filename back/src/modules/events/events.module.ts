import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/modules/prisma/prisma.service';



@Module({
  controllers: [EventsController],
  providers: [EventsService,ConfigService,PrismaService],
})
export class EventsModule {}
