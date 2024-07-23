import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUser: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInUser.email);
    if (!user) {
      console.log('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    console.log(`Comparing passwords: plain - ${signInUser.password}, hashed - ${user.password}`);
    const isPasswordMatching = await compare(signInUser.password, user.password);
  
    if (!isPasswordMatching) {
      console.log('Passwords do not match');
      throw new HttpException('Wrong credentials provided', HttpStatus.UNAUTHORIZED);
    }
  
    console.log('User authenticated successfully');
    const token = await this.createToken(user);
    return { token };
  }
  
  async signUp(signUpUser: SignUpAuthDto) {
    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(signUpUser.password, 10);
    console.log('Hashed password during signup:', hashedPassword);

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
      authOId: signUpUser.authOId || '',
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
