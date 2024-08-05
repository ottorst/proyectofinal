import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Event title, more than 15 characters and less than 30',
    example: 'Primaveras de Madrid',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: 'Event subtitle, more than 30 characters and less than 80',
    example: 'Un homenaje a la vibrante estación en la capital española.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  @MaxLength(80)
  subtitle: string;

  @ApiProperty({
    description: 'Event description, more than 80 characters and less than 300',
    example:
      'La primavera en Madrid es un espectáculo para los sentidos, donde los parques y jardines cobran vida con el colorido de las flores y el cálido sol acaricia las históricas plazas. "Primaveras de Madrid" es una celebración de esta estación efervescente, una cena que captura la esencia de la alegría y la renovación que trae consigo.\nEntrante: Espárragos Blancos de Navarra Tesoros de la tierra, estos espárragos son un manjar de la primavera. Servidos con una vinagreta ligera y lascas de jamón ibérico, son el preludio perfecto. Acompañados de un Verdejo de Rueda, su frescura y notas herbáceas complementan la delicadeza de los espárragos.\n...',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(80)
  description: string;

  @ApiProperty({
    description:
      'String compatible with .toISOString(). Event date, is a DateString in order to front easily data transfer, example: 2020-01-01. It must be a future date. Not Optional and default is now.',
    example: '2020-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description:
      'Event location, GPS coordinates. example for "Plaza Puerta del Sol, Madrid, Spain". Latitude and longitude coordinates are: "40.416729, -3.703339."',
    example: '40.416729, -3.703339',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  // @ApiProperty({
  //   description: 'User profile picture, as URL of Cloudinary. Optional..',
  //   nullable: true,
  //   example:
  //     'https://res.cloudinary.com/dxkqy4os7/image/upload/v1720008542/uploads/nasa_cohete_luna.jpg.jpg',
  //   default: false,
  // })
  // @IsString()
  // document?: string;

  @ApiProperty({
    description: 'Event max seats. Default is 8',
    example: '8',
  })
  @IsNumber()
  maxseats: number;

  @ApiProperty({
    description: 'Price per seat, default is 250 €.',
    example: '250',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Event picture, as URL of Cloudinary. Never Optional.',
    nullable: true,
    example:
      'https://res.cloudinary.com/dxkqy4os7/image/upload/v1720008542/uploads/nasa_cohete_luna.jpg.jpg',
  })
  @IsString()
  picture?: string;
}
