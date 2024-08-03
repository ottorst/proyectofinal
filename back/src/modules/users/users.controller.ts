// @Controller('users')

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
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExcludeEndpoint,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/guards/auth/auth0.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('seeder')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED, //201
    description: `${HttpStatus.CREATED}: Users database seeded initializer (15 users, 4 admins).`,
  })
  seeder() {
    return this.usersService.seeder();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password !== createUserDto.passwordConfirm) {
        throw new BadRequestException('Controller. Passwords do not match.');
      }
      const userCreated = await this.usersService.create(createUserDto);
      return userCreated;
    } catch (err: any) {
      throw new BadRequestException('Error creating a user. ' + err.message);
    }
  }

  @Get()
  //@UseGuards(AuthorizationGuard) // Aplica el guardia a esta ruta
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: `${HttpStatus.OK}: Users list retrieved successfully.`,
    type: CreateUserDto,
    isArray: true,
  })
  // @ApiQuery({ name: 'name', required: false, type: String })
  // @ApiQuery({ name: 'page', required: true, type: Number })
  // @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Role: ADMIN, AuthGuard.',
  })
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        'All users error. ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
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

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('CreateUserDto received in create method:', id, updateUserDto);

    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new HttpException(
          'User not found, send the right ID.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return this.usersService.update(+id, updateUserDto);
      }
    } catch (error) {
      throw new HttpException(
        'User not found. ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: `${HttpStatus.ACCEPTED}: Delete user by UUID.`,
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid UUID' })
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Role: ADMIN, AuthGuard.',
  })
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

  @Get('deleteds')
  @HttpCode(HttpStatus.OK)
  async deletedUsers() {
    try {
      return await this.usersService.deleteds();
    } catch (error) {
      throw new HttpException(
        'All deleted users error. ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('usersWithBookingsAndEvents')
  @HttpCode(HttpStatus.OK)
  async usersWithBookingsAndEvents() {
    try {
      const users = await this.usersService.usersWithBookingsAndEvents();
      if (!users) {
        throw new Error('Users with bookings and events not found');
      }
      return users;
    } catch (error) {
      throw new HttpException(
        'All users with bookings and events error. ' + error.message,
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
}
