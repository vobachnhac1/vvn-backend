import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigMySQL2 } from 'src/database/typeorm.config';
import { LoginController } from './login.controller';
import { LoginRepository } from './login.repository';
import { LoginService } from './login.service';
import JwtStrategy from './strategies/login.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigMySQL2),
    JwtModule.register({}),
  ],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository, JwtStrategy ]
})
export class LoginModule { }

