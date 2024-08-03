import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {CloudinaryService} from "src/clouinary/cloudinary.service"
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // directorio temporal para subir archivos
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService,ConfigService,PrismaService,CloudinaryService],
})
export class EventsModule {}
