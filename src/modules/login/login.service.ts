const __ = require('lodash');
import * as argon from 'argon2';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "src/logging";
import { ResponseObj } from "src/shared";
import { LoginDTO, ResponsePayLoad, TokenGenerationReq } from "./dto";
import { LoginRepository } from "./login.repository";

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LoginService {
  private readonly logger: Logger = new Logger(LoginService.name);
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectRepository(LoginRepository) private loginRepo: LoginRepository,
  ) { }

  async login(payload: TokenGenerationReq): Promise<ResponseObj> {
    let response = new ResponseObj();
    // try {
       //check JWT
      const arrUser = await this.loginRepo.verifyAccount(payload.username, payload.password);
      console.log('arrUser: ', arrUser);

      if (!arrUser) throw new ForbiddenException('Access Denied 1');
      const user: LoginDTO = __.head(arrUser);
      const _hash = await argon.hash(payload.password);
      const passwordMatches = await argon.verify(user.password, payload.password);
      if (!passwordMatches) throw new ForbiddenException('Access Denied 2');
      const tokens = await this.getTokens(user.id, user.username, user);
      await this.updateRtHash(user.id, tokens.refresh_token);
      response.message = "Login thành công";
      response.data = tokens;
      return response;

  }

  async registerAccount(payload: LoginDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    // try {
      const {password, username} = payload;
      const hash = await argon.hash(payload.password);
      const account:LoginDTO[] = await this.loginRepo.verifyAccount(username, password);
      if (account.length > 0) {
        throw new ForbiddenException('The account has been registered');
      }
      const paramInsert = {
        ...payload,
        password: hash
      }
       // đăng ký mới thành công
      await this.loginRepo.registerAccount(paramInsert);
      const userTemp: LoginDTO[] = await this.loginRepo.verifyAccount(username, password);
      const user = {
        ...userTemp[0],
        userId: userTemp[0].id,
        username: payload.username
    }
    const tokens = await this.getTokens(user.userId, user.username, user );
    await this.updateRtHash(user.userId, tokens.refresh_token);
    response.message = "Tạo tài khoản thành công";
    return response;
  }

  async resetPassword(payload: LoginDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.loginRepo.resetPassword(payload);
      response.message = "Reset mật khẩu thành thành công";
      return response;
    } catch (error) {
      this.logger.error("resetPassword Login", error)
      return response;
    }
  }

  async updateProfile(payload: LoginDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.loginRepo.updateProfile(payload);
      response.message = "Cập nhật profile thành công";
      return response;
    } catch (error) {
      this.logger.error("updateProfile Login", error)
      return response;
    }
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.loginRepo.updateToken(userId, hash);
  }

  async getTokens(userId: string, username: string, user: LoginDTO): Promise<ResponsePayLoad> {
    const jwtPayload: any = {
        roles: user.roles,
        username: username,
        userId: userId
    };

    const [at, rt] = await Promise.all([
        this.jwtService.signAsync({ user: jwtPayload }, {
            secret: this.config.get<string>('AT_SECRET'),
            expiresIn: '1d',
        }),
        this.jwtService.signAsync({ user: jwtPayload }, {
            secret: this.config.get<string>('RT_SECRET'),
            expiresIn: '7d',
        }),
    ]);

    return {
        access_token:   at,
        refresh_token:  rt,
        username:       user.username,
        fullname:       user.fullname,
        avatar_url:     user.avatar_url,
        roles:          user.roles,
        position:       user.position,
        devices_info:   user.devices_info,
        created_date:   user.created_date,
        updated_date:   user.updated_date,
        phone:   user.phone,
        email:   user.email,
    };
  }
}