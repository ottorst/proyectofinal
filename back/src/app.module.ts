import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BookingModule } from './modules/booking/booking.module';
import {FileUploadModule}from './modules/image-upload/image-upload.module'
import { SendEmailModule } from './modules/send-email/sendEmail.module';

@Module({
  imports: [UsersModule, EventsModule, AuthModule, PrismaModule, BookingModule,FileUploadModule,SendEmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
