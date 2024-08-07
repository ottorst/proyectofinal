import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SendEmailService } from './sendEmail.service';
import { SendMailDto } from './dto/sendEmail.dto';
import { SendEmailResponseDto } from './dto/sendEmailResponse.dto';

@ApiTags('email')
@Controller('email')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar un correo electrónico' })
  @ApiResponse({
    status: 201,
    description: 'Correo enviado exitosamente.',
    type: SendEmailResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Error en el servidor.',
  })
  @ApiBody({ type: SendMailDto })
  async sendEmail(@Body() sendEmailDto: SendMailDto) {
    const { to, subject, text, html } = sendEmailDto;
    try {
      return await this.sendEmailService.sendMail(to, subject, text, html);
    } catch (error) {
      throw new InternalServerErrorException("error en el servidor", error.message);
    }
  }
}
