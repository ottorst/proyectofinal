import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { jsonWebTokenModule } from 'src/Jwt/jwt.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    jsonWebTokenModule, // Usa el módulo que configura JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
