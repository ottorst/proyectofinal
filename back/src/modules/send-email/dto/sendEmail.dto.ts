import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

/**
 * Data Transfer Object for sending an email
 */
export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email address of the recipient',
    example: 'example@example.com'
  })
  to: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Subject of the email',
    example: 'Email Subject'
  })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Plain text content of the email',
    example: 'This is the plain text content of the email'
  })
  text: string;

  @IsString()
  @IsEmpty()
  @ApiProperty({
    description: 'HTML content of the email',
    example: '<h1>This is the HTML content of the email</h1>'
  })
  html?: string;
}

/**
 * Data Transfer Object for sending a registration email
 */
export class SendMailRegisterDto extends  OmitType(SendMailDto, ['html', "subject"]){
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL of the home page',
    example: 'https://www.example.com'
  })
  urlHome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the recipient',
    example: 'John Doe'
  })
  name: string;
}

/**
 * Data Transfer Object for sending a booking confirmation email
 */
export class SendMailBookingDto extends OmitType(SendMailDto, ['html', "subject"]) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the event',
    example: 'Primaveras de Madrid'
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Subtitle of the event',
    example: 'Un homenaje a la vibrante estación en la capital española'
  })
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the event',
    example: 'La primavera en Madrid es un espectáculo para los sentidos, donde los parques y jardines cobran vida con el colorido de las flores y el cálido sol acaricia las históricas plazas. "Primaveras de Madrid" es una celebración de esta estación efervescente, una cena que captura la esencia de la alegría y la renovación que trae consigo.'
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date of the event',
    example: '2024-08-05T00:00:00.000Z'
  })
  date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Location of the event as coordinates',
    example: '40.416729, -3.703339'
  })
  location: string;

  @IsNumber()
  @IsNotEmpty()

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price per seat',
    example: 255
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL of the event picture',
    example: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  })
  picture: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL of the home page',
    example: 'https://www.example.com'
  })
  urlHome: string;
}
