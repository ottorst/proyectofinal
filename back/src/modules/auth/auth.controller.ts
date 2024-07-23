import { Body, Controller, Get, HttpCode, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserResponseDto } from '../users/dto/response.user.dto';
import { DateAdderInterceptor } from 'src/interceptor/date-adder.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: SignInAuthDto) {
    console.log('Credentials received:', credentials);
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  @HttpCode(201)
  @UseInterceptors(DateAdderInterceptor)
  async signUp(@Body() signUpUser: SignUpAuthDto, @Req() request) {
    const user = { ...signUpUser, createdAt: request.date };
    const newUser = await this.authService.signUp(user);

    return new UserResponseDto({
      ...newUser,
      id: newUser.id.toString(),
    });
  }
}
