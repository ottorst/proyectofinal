import { Module } from '@nestjs/common';
import { SendEmailService } from './sendEmail.service';
import { SendEmailController } from './sendEmail.controller';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Module({
  providers: [SendEmailService,NodemailerService],
  controllers: [SendEmailController],
})
export class SendEmailModule {}
