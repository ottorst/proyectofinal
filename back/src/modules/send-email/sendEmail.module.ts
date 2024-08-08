import { Module } from '@nestjs/common';
import { SendEmailService } from './sendEmail.service';
import { SendEmailController } from './sendEmail.controller';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { TemplateService } from './template.service';

@Module({
  providers: [SendEmailService,NodemailerService, TemplateService],
  controllers: [SendEmailController],
})
export class SendEmailModule {}
