import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { ResponseObj } from 'src/shared';
import { MailService } from './server-mail.service';

@ApiTags('Quản lý Email')
@Controller('email')
export class MailController {
  constructor(
    private mailerService: MailerService,
    private mailService: MailService,
  ) {}

  @Get('send')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Send Email',
  })
  async sendmail(): Promise<any> {
    // const response = await this.mailerService.sendMail({
    //   to: 'vobachnhac@gmail.com', // list of receivers
    //   from: 'noreply.teamit2020@gmail.com', // sender address
    //   subject: 'Testing Nest MailerModule ✔', // Subject line
    //   text: 'welcome', // plaintext body
    //   html: '<b>welcome</b>', // HTML body content
    // })
    return this.mailService.example3();
  }

  @Get('plain-text-email')
  async plainTextEmail() {
    // async plainTextEmail(@Query('toemail') toEmail) {
    var response = await this.mailerService.sendMail({
      to: 'vobachnhac@gmail.com',
      from: 'noreply.teamit2020@gmail.com',
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
    });
    return response;
  }

  @Post('html-email')
  async postHTMLEmail(@Body() superHero: any) {
    var response = await this.mailerService.sendMail({
      to: 'vobachnhac@gmail.com',
      from: 'noreply.teamit2020@gmail.com',
      subject: 'HTML Dynamic Template',
      template: 'superhero',
      context: {
        superHero: superHero,
      },
    });
    return 'success';
  }

  @Get('file-attachment')
  async fileAttachement(@Query('toemail') toemail) {
    var response = await this.mailerService.sendMail({
      to: toemail,
      from: 'noreply.teamit2020@gmail.com',
      subject: 'File Attachment',
      html: '<h1>File Attachment</h1>',
      attachments: [
        {
          path: join(__dirname, 'mails', 'bike-1.webp'),
          filename: '1.webp',
          contentDisposition: 'attachment',
        },
      ],
    });
    return 'success';
  }
}
