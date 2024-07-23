import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('seeder')
  @HttpCode(HttpStatus.CREATED)
  seeder() {
    return this.usersService.seeder();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.usersService.create(createUserDto);
      return userCreated;
    } catch (err: any) {
      throw new BadRequestException('Error creating a user. ' + err.message);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Param('email') email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      user.password = null;
      return user;
    } catch (err: any) {
      throw new HttpException(
        `Error finding a user ${email}. ${err.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      console.log(`findOne(@Param('id') ${id}: string)`, user);

      if (!user) {
        throw new Error('User not found');
      }
      user.password = null;
      return user;
    } catch (err: any) {
      throw new HttpException(
        'Error finding a user. ' + err.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // TODO: try/catch (handle errors)
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    // TODO: check if user is admin
    try {
      const user = await this.usersService.remove(+id);
      if (!user) {
        throw new Error('User to delete was not found');
      }
      user.password = null;
      return user;
    } catch (err: any) {
      throw new HttpException(
        `Error deleting a user. ${err.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
