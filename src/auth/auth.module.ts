/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigMySQL2 } from '../database/typeorm.config';
import { AuthController } from '../auth/auth.controller';
import { AuthJwtRepository } from '../auth/auth.repository';
import { AuthService } from '../auth/auth.service';
import { AtStrategy, RtStrategy, BasicStrategy } from '../auth/strategies';
import { PasswordService } from './password.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    TypeOrmModule.forRoot(TypeOrmConfigMySQL2),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, BasicStrategy, ConfigService, AuthJwtRepository, PasswordService],
})
export class AuthModule { }
