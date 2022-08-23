import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './server-mail.service';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { MailController } from './server-mail.controller';

@Module({
  imports: [
    MailModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        console.log('MailerModule: ', resolve(__dirname, '.', '../../mails'));
        return {
          transport: {
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
              user: 'noreply.teamit2020@gmail.com',
              pass: 'qpsbysddvycmofwy', //
            },
          },
          template: {
            dir: resolve(__dirname, '.', '../../mails'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
