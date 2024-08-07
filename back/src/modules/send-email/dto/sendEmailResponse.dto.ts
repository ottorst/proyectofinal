import { ApiProperty } from '@nestjs/swagger';

class Envelope {
  @ApiProperty({
    description: 'Correo electrónico del remitente',
    example: 'experienciasculinarias7@gmail.com',
  })
  from: string;

  @ApiProperty({
    description: 'Lista de correos electrónicos de los destinatarios',
    example: ['example@gmail.com'],
  })
  to: string[];
}

export class SendEmailResponseDto {
  @ApiProperty({
    description: 'Lista de correos electrónicos aceptados',
    example: ['example@gmail.com'],
  })
  accepted: string[];

  @ApiProperty({
    description: 'Lista de correos electrónicos rechazados',
    example: [],
  })
  rejected: string[];

  @ApiProperty({
    description: 'Lista de características EHLO',
    example: [
      'SIZE 35882577',
      '8BITMIME',
      'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
      'ENHANCEDSTATUSCODES',
      'PIPELINING',
      'CHUNKING',
      'SMTPUTF8',
    ],
  })
  ehlo: string[];

  @ApiProperty({
    description: 'Tiempo en milisegundos que tardó el proceso del sobre',
    example: 729,
  })
  envelopeTime: number;

  @ApiProperty({
    description: 'Tiempo en milisegundos que tardó el proceso del mensaje',
    example: 662,
  })
  messageTime: number;

  @ApiProperty({
    description: 'Tamaño del mensaje en bytes',
    example: 660,
  })
  messageSize: number;

  @ApiProperty({
    description: 'Respuesta del servidor de correo',
    example: '250 2.0.0 OK  1722998026 d2e1a72fcca58-7106ed2c5b4sm7537980b3a.185 - gsmtp',
  })
  response: string;

  @ApiProperty({
    type: Envelope,
    description: 'Detalles del sobre del mensaje',
  })
  envelope: Envelope;

  @ApiProperty({
    description: 'ID del mensaje',
    example: '<fc840989-dc0f-e94e-45ae-13db64ebf8f0@gmail.com>',
  })
  messageId: string;
}
