import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { jsonWebTokenModule } from 'src/Jwt/jwt.module';
import { requiresAuth } from 'express-openid-connect';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    jsonWebTokenModule,
    JwtModule, // Agrega configuración para JwtModule si es necesario
    PrismaModule, // Asegúrate de que PrismaModule esté importado aquí
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('auth/auth0');
  }
}
