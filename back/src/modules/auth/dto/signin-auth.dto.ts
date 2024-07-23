import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
