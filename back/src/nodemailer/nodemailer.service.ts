import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { nodemailerConfig } from 'src/config/nodemailer-config';

@Injectable()
export class NodemailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(nodemailerConfig);
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: nodemailerConfig.auth.user,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: %s', info.messageId);
      return info;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
