import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { validateOrReject, ValidationError } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUser: SignInAuthDto) {
    if (!signInUser.email || !signInUser.password) {
      throw new HttpException('Missing email or password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findByEmail(signInUser.email);
    if (!user) {
      console.log('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatching = await compare(signInUser.password, user.password);
    if (!isPasswordMatching) {
      console.log('Passwords do not match');
      throw new HttpException('Wrong credentials provided', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.createToken(user);
    return { token };
  }

  async signUp(signUpUser: SignUpAuthDto) {
    try {
      await validateOrReject(signUpUser);
    } catch (errors) {
      // Generar un mensaje de error adecuado a partir de los errores de validación
      const validationErrors = errors
        .flatMap(error => 
          error.constraints ? Object.values(error.constraints) : []
        )
        .join(', ');
      throw new HttpException(`Validation failed: ${validationErrors}`, HttpStatus.BAD_REQUEST);
    }

    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userService.findByEmail(signUpUser.email);
    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hash(signUpUser.password, 10);

    const createUserDto: CreateUserDto = {
      email: signUpUser.email,
      name: signUpUser.name,
      password: hashedPassword,
      passwordConfirm: signUpUser.passwordConfirm,
      phone: signUpUser.phone,
      address: signUpUser.address,
      city: signUpUser.city,
      country: signUpUser.country,
      birthday: signUpUser.birthday || '',
      allergies: signUpUser.allergies || '',
      picture: signUpUser.picture || '',
      auth0Id: signUpUser.auth0Id || '',
      admin: signUpUser.admin || false,
    };

    return this.userService.create(createUserDto);
  }

  private async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }
}
