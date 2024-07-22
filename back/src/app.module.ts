import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [UsersModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
