import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Dirección de correo electrónico del destinatario',
    example: 'example@example.com'
  })
  to: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Asunto del correo electrónico',
    example: 'Asunto del correo'
  })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Texto plano del correo electrónico',
    example: 'Este es el contenido del correo en texto plano'
  })
  text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contenido HTML del correo electrónico',
    example: '<h1>Este es el contenido del correo en HTML</h1>'
  })
  html: string;
}
