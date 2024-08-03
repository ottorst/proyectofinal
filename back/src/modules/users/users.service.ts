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

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
        birthday: new Date(createUserDto.birthday),
        allergies: createUserDto.allergies,
        address: createUserDto.address,
        city: createUserDto.city,
        country: createUserDto.country,
        // picture: createUserDto.picture,
        auth0Id: createUserDto.auth0Id,
        admin: createUserDto.admin,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        where: { deletedAt: null },
        orderBy: { name: 'asc' },
      });
      return users;
    } catch (error) {
      throw new Error('Error en el servicio de listado de usuarios.');
    }
  }

  async usersWithBookingsAndEvents() {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          bookings: {
            include: {
              events: true,
            },
          },
        },
      });
      return users;
    } catch (error) {
      throw new Error(
        'Error en el servicio de búsqueda de usuarios con eventos y reservas.',
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log('CreateUserDto received in create method:', updateUserDto);
    const updatedData: Partial<CreateUserDto> = {};
    try {
      // if (updateUserDto.email) {
      //   updatedData.email = updateUserDto.email;
      // }
      let somethingChanged = false;
      if (updateUserDto.name) {
        updatedData.name = updateUserDto.name;
        somethingChanged = true;
      }
      if (updateUserDto.password) {
        if (updateUserDto.password !== updateUserDto.passwordConfirm) {
          throw new Error('Services. Passwords do not match');
        }
        updatedData.password = await bcrypt.hash(updateUserDto.password, 10);
        somethingChanged = true;
      }
      if (updateUserDto.phone) {
        updatedData.phone = updateUserDto.phone;
        somethingChanged = true;
      }
      if (updateUserDto.birthday) {
        updatedData.birthday = new Date(updateUserDto.birthday).toISOString();
        somethingChanged = true;
      }
      if (updateUserDto.allergies) {
        updatedData.allergies = updateUserDto.allergies;
        somethingChanged = true;
      }
      if (updateUserDto.address) {
        updatedData.address = updateUserDto.address;
        somethingChanged = true;
      }
      if (updateUserDto.city) {
        updatedData.city = updateUserDto.city;
        somethingChanged = true;
      }
      if (updateUserDto.country) {
        updatedData.country = updateUserDto.country;
        somethingChanged = true;
      }
      // if (updateUserDto.auth0Id) {
      //   updatedData.auth0Id = updateUserDto.auth0Id;
      // }

      if (updateUserDto.admin !== undefined) {
        updatedData.admin = updateUserDto.admin;
        somethingChanged = true;
      }

      if (!somethingChanged) {
        throw new Error('Nothing to update');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: updatedData,
      });

      return updatedUser;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new Error('Error en el servicio de actualización de usuario.');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return user;
    } catch (error) {
      console.log('User not found');
    }
  }

  async deleteds() {
    try {
      const users = await this.prisma.user.findMany({
        where: { deletedAt: { not: null } },
        orderBy: { name: 'asc' },
      });
      return users;
    } catch (error) {
      throw new Error(
        'Error en el servicio de búsqueda de usuarios eliminados.',
      );
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            events: true,
          },
        },
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        bookings: {
          include: {
            events: true,
          },
        },
      },
    });
    return user;
  }
}
