import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInAuthDto {
  @ApiProperty({
    description: 'User email',
    example: 'pedro.gonzalez@myMail.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyPassw0rd!',
  })
  @IsNotEmpty()
  password: string;
}
