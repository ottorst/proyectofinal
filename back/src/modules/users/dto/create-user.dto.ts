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

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{6,15}$/,
    {
      message:
        'The Password must have at least: one lowercase letter, one uppercase letter, one number, one special character, between 6 and 15 characters long.',
    },
  )
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsDateString()
  birthday: string;

  @IsString()
  @IsOptional()
  allergies: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsOptional()
  address: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  city?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  country?: string;

  @IsString()
  picture: string;

  @IsString()
  authOId: string;

  @IsBoolean()
  admin: boolean;
}
