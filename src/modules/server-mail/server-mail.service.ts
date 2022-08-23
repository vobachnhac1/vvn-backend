import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { User } from './../user/user.entity';

export interface User {
  email: string;
  name: string;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    // const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        // url,
      },
    });
  }

  public example(): void {
    this.mailerService
      .sendMail({
        to: 'vobachnhac@gmail.com', // list of receivers
        from: 'noreply.teamit2020@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'index', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public example2(): void {
    this.mailerService
      .sendMail({
        to: 'vobachnhac@gmail.com', // list of receivers
        from: 'noreply.teamit2020@gmail.com', // sender address
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public example3(): void {
    this.mailerService
      .sendMail({
        to: 'vobachnhac@gmail.com', // list of receivers
        from: 'noreply.teamit2020@gmail.com', // sender address
        subject: 'Testing Nest Mailermodule with template ✔',
        template: '/index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
