import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserResponseDto } from '../users/dto/response.user.dto';
import { DateAdderInterceptor } from 'src/interceptor/date-adder.interceptor';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: SignInAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Missing or invalid fields.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Incorrect email or password.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Unexpected error occurred.',
  })
  async signIn(@Body() credentials: SignInAuthDto) {
    try {
      if (!credentials.email || !credentials.password) {
        throw new HttpException(
          'Missing email or password',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.authService.signIn(credentials);
    } catch (error) {
      console.error('Sign-in error:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Unexpected error occurred during sign-in.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signup')
  @HttpCode(201)
  @UseInterceptors(DateAdderInterceptor)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignUpAuthDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Missing or invalid fields.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. User with this email already exists.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Unexpected error occurred.',
  })
  async signUp(@Body() signUpUser: SignUpAuthDto, @Req() request) {
    try {
      if (
        !signUpUser.email ||
        !signUpUser.password ||
        !signUpUser.passwordConfirm
      ) {
        throw new HttpException(
          'Missing required fields',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (signUpUser.password !== signUpUser.passwordConfirm) {
        throw new HttpException(
          'Passwords do not match',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = { ...signUpUser, createdAt: request.date };
      const newUser = await this.authService.signUp(user);
      return new UserResponseDto({
        ...newUser,
        id: newUser.id.toString(),
        createdAt: newUser.createdAt.toISOString(),
      });
    } catch (error) {
      console.error('Sign-up error:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Unexpected error occurred during sign-up.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('auth0')
  async Auth0(@Req() req: Request, @Res() res: Response) {
    try {
      if (req.oidc?.isAuthenticated()) {
        const email = req.oidc.user?.email;
        const auth0Id = req.oidc.user?.sub;

        if (!email || !auth0Id) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No email or auth0Id found' });
        }

        let user = await this.authService.findUserByAuth0IdOrEmail(auth0Id, email);

        if (!user) {
          const newUser: SignUpAuthDto = {
            email: email,
            name: req.oidc.user.name || 'Nombre por defecto',
            password: '', // No se almacena una contraseña si el usuario usa Auth0
            passwordConfirm: '',
            auth0Id: auth0Id,
          };

          user = await this.authService.registerUserWithAuth0(newUser);
        }

        const token = await this.authService.createToken(user);

        return res.status(HttpStatus.OK).json({ token });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'User not authenticated' });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error auth0 user', error });
    }
  }
}
