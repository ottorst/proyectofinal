import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],  // Importa PrismaModule aquí
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  // Exporta UsersService si lo necesitas en otros módulos
})
export class UsersModule {}
