import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Transaction Number',
    example: '123456785',
  })
  @IsString()
  @IsNotEmpty()
  transactionNumber: string;

  @ApiProperty({
    description: 'Quantity of tickets',
    example: 1,
  })
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Paid amount',
    example: 350,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  paid: number;

  @ApiProperty({
    description: 'Date of booking',
    example: '2024-08-10T20:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Event Id',
    example: 1,
  })
  @IsNotEmpty()
  eventsId: number;

  @ApiProperty({
    description: 'User Id',
    example: 4,
  })
  @IsNotEmpty()
  userId: number;
}
