import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SignUpAuthDto } from "./dto/signup-auth.dto";
import { validateOrReject } from "class-validator";
import { User } from "@prisma/client";
import { SignInAuthDto } from "./dto/signin-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(signInUser: SignInAuthDto) {
    if (!signInUser.email || !signInUser.password) {
      throw new HttpException('Missing email or password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.findByEmail(signInUser.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatching = await compare(signInUser.password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.createToken(user);
    return { token };
  }

  async signUp(signUpUser: CreateUserDto) {
    try {
      await validateOrReject(signUpUser);
    } catch (errors) {
      const validationErrors = errors
        .flatMap((error) => error.constraints ? Object.values(error.constraints) : [])
        .join(', ');
      throw new HttpException(`Validation failed: ${validationErrors}`, HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.findByEmail(signUpUser.email);
    if (existingUser) {
      // Si el usuario ya existe, solo actualiza el Auth0 ID si no está presente
      if (signUpUser.auth0Id && existingUser.auth0Id !== signUpUser.auth0Id) {
        return this.updateAuth0Id(existingUser.id, signUpUser.auth0Id);
      }
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hash(signUpUser.password, 10);

    const createUserDto: CreateUserDto = {
      email: signUpUser.email,
      name: signUpUser.name,
      password: hashedPassword,
      phone: signUpUser.phone,
      address: signUpUser.address,
      city: signUpUser.city,
      country: signUpUser.country,
      birthday: signUpUser.birthday || '',
      allergies: signUpUser.allergies || '',
      auth0Id: signUpUser.auth0Id || '',
      admin: signUpUser.admin || false,
    };

    return this.create(createUserDto);
  }

  async findUserByAuth0IdOrEmail(auth0Id: string, email?: string): Promise<User | null> {
    if (auth0Id) {
      return await this.findByAuth0Id(auth0Id, email);
    }

    if (email) {
      return await this.findByEmail(email);
    }

    return null;
  }

  async registerUserWithAuth0(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      // Actualiza el Auth0 ID si el usuario ya existe
      if (createUserDto.auth0Id && existingUser.auth0Id !== createUserDto.auth0Id) {
        return this.updateAuth0Id(existingUser.id, createUserDto.auth0Id);
      }
      return existingUser;
    }

    return this.create(createUserDto);
  }

  async updateAuth0Id(userId: number, auth0Id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { auth0Id },
    });
  }

  public async createToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  async findByAuth0Id(auth0Id: string, email?: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email_auth0Id: {
          auth0Id: auth0Id,
          email: email || '',
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const { passwordConfirm, ...userData } = user;
    try {
      return await this.prisma.user.create({
        data: userData,
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
