import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';
import * as bcryp from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class UsersService {
  // constructor(private readonly prisma: PrismaClient) {}
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
    const cryptedPassword = await bcryp.hash(createUserDto.password, 10);

    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new Error(`Passwords do not match.${cryptedPassword}`);
    }

    const findUser = await this.findByEmail(createUserDto.email);

    if (findUser) {
      throw new Error(`User with email ${createUserDto.email} already exists.`);
    }

    const user = await prisma.user.create({
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
        auth0Id: createUserDto.email,
        admin: createUserDto.admin,
        password: cryptedPassword,
      },
    });

    user.password = null;

    return user;
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      console.log('User not found');
    }
  }
}
