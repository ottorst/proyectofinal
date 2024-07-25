import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserResponseDto } from '../users/dto/response.user.dto';
import { DateAdderInterceptor } from 'src/interceptor/date-adder.interceptor';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: SignInAuthDto })
  @ApiResponse({ status: 200, description: 'Successfully signed in', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. Missing or invalid fields.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Incorrect email or password.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error. Unexpected error occurred.' })
  async signIn(@Body() credentials: SignInAuthDto) {
    try {
      // Asegúrate de que el DTO sea válido (opcional, dependiendo de cómo manejes la validación)
      if (!credentials.email || !credentials.password) {
        throw new HttpException('Missing email or password', HttpStatus.BAD_REQUEST);
      }

      return await this.authService.signIn(credentials);
    } catch (error) {
      console.error('Sign-in error:', error.message);

      // Identifica el tipo de error
      if (error instanceof HttpException) {
        throw error; // Re-lanza errores específicos que ya tienen un HttpException
      }

      // Maneja errores genéricos
      throw new HttpException('Unexpected error occurred during sign-in.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('signup')
  @HttpCode(201)
  @UseInterceptors(DateAdderInterceptor)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignUpAuthDto })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. Missing or invalid fields.' })
  @ApiResponse({ status: 409, description: 'Conflict. User with this email already exists.' })
  @ApiResponse({ status: 500, description: 'Internal server error. Unexpected error occurred.' })
  async signUp(@Body() signUpUser: SignUpAuthDto, @Req() request) {
    try {
      if (!signUpUser.email || !signUpUser.password || !signUpUser.passwordConfirm) {
        throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
      }
      if (signUpUser.password !== signUpUser.passwordConfirm) {
        throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
      }

      const user = { ...signUpUser, createdAt: request.date };
      const newUser = await this.authService.signUp(user);
      return new UserResponseDto({
        ...newUser,
        id: newUser.id.toString(),
      });
    } catch (error) {
      console.error('Sign-up error:', error.message);

      // Identifica el tipo de error
      if (error instanceof HttpException) {
        throw error; // Re-lanza errores específicos que ya tienen un HttpException
      }

      // Maneja errores genéricos
      throw new HttpException('Unexpected error occurred during sign-up.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
