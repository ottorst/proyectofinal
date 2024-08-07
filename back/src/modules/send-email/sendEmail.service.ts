import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { SendEmailResponseDto } from './dto/sendEmailResponse.dto';

@Injectable()
export class SendEmailService {
  constructor(private readonly nodemailerService: NodemailerService) {}

  async sendMail(to: string, subject: string, text: string, html: string):Promise<SendEmailResponseDto> {
    try {
      return await this.nodemailerService.sendMail(to, subject, text, html);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
