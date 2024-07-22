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
    console.log(parseData);
    for (const userJson of parseData) {
      // TODO:  I'll need to change this to PrismaService
      // await this.usersRepository.create(user);
    }
    // throw new Error('Method not implemented.');
    return parseData;
  }

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto:', createUserDto);
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
    const user = await prisma.user.delete({
      where: { id },
    });
    return `This action removes a #${id} user`;
  }
}
