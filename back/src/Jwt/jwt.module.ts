import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = '73060cd70b129872c499c6cfeeb69dc1b1956f4e46d1fbf7692108567b44c74c'; //configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET no está definido');
        }
        return {
          secret,
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class jsonWebTokenModule {}
