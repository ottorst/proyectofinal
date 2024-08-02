import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {CloudinaryService} from "src/clouinary/cloudinary.service"


@Module({
  controllers: [EventsController],
  providers: [EventsService,ConfigService,PrismaService,CloudinaryService],
})
export class EventsModule {}
