import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async seeder() {
    const usersData = fs.readFileSync('src/datainit/users.json', 'utf8');
    const parseData = JSON.parse(usersData);
    const createdUsers = [];
    for (const userJson of parseData) {
      try {
        createdUsers.push(await this.create(userJson));
      } catch (error) {
        console.log(error);
      }
    }
    return createdUsers;
  }

  async create(createUserDto: CreateUserDto) {
    console.log('CreateUserDto received in create method:', createUserDto);
    const findUser = await this.findByEmail(createUserDto.email);
    if (findUser) {
      throw new Error(`Can't create the user.`);
    }

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
        birthday: createUserDto.birthday,
        allergies: createUserDto.allergies,
        address: createUserDto.address,
        city: createUserDto.city,
        country: createUserDto.country,
        picture: createUserDto.picture,
        auth0Id: createUserDto.authOId,
        admin: createUserDto.admin,
        password: createUserDto.password
      },
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      console.log('User not found');
    }
  }
}
