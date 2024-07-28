import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'pedro.gonzalez@myMail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Pedro González',
  })
  @IsString()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    description:
      'The Password must have at least: one lowercase letter, one uppercase letter, one number, one special character, between 6 and 15 characters long.',
    example: 'MyPassw0rd!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{6,15}$/,
    {
      message: 'La contraseña debe cumplir con los requisitos.',
    },
  )
  password: string;

  @ApiProperty({
    description:
      'The Password confirm value for creation must match the Password value.',
    nullable: true,
    example: 'MyPassw0rd!',
  })
  @IsOptional()
  @IsString()
  passwordConfirm?: string;

  @IsOptional()
  @ApiProperty({
    description: 'User phone. Optional.',
    nullable: true,
    example: '+34 (91) 123 456789',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description:
      'Birthday in DateString, example: 2020-01-01. Optional and default: is current date',
    example: '2020-01-01T00:00:00.000Z',
  })
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @ApiProperty({
    description: 'User city. Optional.',
    nullable: true,
    example: 'Madrid',
  })
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'User country. Optional.',
    nullable: true,
    example: 'Spain',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  country?: string;

  // @IsOptional()
  // @ApiProperty({
  //   description: 'User profile picture, as URL of Cloudinary. Optional..',
  //   nullable: true,
  //   example:
  //     'https://res.cloudinary.com/dxkqy4os7/image/upload/v1720008542/uploads/nasa_cohete_luna.jpg.jpg',
  //   default: false,
  // })
  // @IsString()
  // picture?: string;

  @IsOptional()
  @ApiProperty({
    description:
      'Integration with auth0 integration. Optional. Default value: email.',
    nullable: true,
    example: 'pedro.gonzalez@myMail.com',
    default: false,
  })
  @IsString()
  auth0Id?: string;

  @IsOptional()
  @ApiProperty({
    description: 'User role for administrators, as bool. Default value: false.',
    nullable: true,
    example: true,
    default: false,
  })
  @IsBoolean()
  admin?: boolean;
}
