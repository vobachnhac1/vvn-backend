/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-03-30
 *------------------------------------------------------- */
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { configuration } from './config';
import { PassportModule } from '@nestjs/passport';
import { KhoathiModule } from './modules/khoathi/khoathi.module';
import { TeamModule } from './modules/team/team.module';
import { ChamThiModule } from './modules/chamthi/chamthi.module';
import { LoginModule } from './modules/login/login.module';
import { TaskModule } from './modules/task/task.module';
import { MailModule } from './modules/server-mail/server-mail.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    RouterModule.register([
      // đăng ký 1 route và path muốn kết nối
    ]),
    TeamModule,
    KhoathiModule,
    ChamThiModule,
    LoginModule,
    TaskModule,
    MailModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
