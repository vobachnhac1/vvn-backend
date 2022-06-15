/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProfileAccountWithPermisstion, ResponsePayLoad } from './types';
import { AuthJwtDTO, TokenGenerationReq } from './dto';
import * as argon from 'argon2';
import { Logger } from '../logging';
import { AuthJwtRepository } from './auth.repository';
import { PasswordService } from './password.service';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(AuthJwtRepository) private authRepo: AuthJwtRepository,
        private jwtService: JwtService,
        private passwordService: PasswordService,
        private config: ConfigService,
    ) { }
    async signupLocal(payload: TokenGenerationReq): Promise<ResponsePayLoad> {
        const hash = await argon.hash(payload.password);
        const account: AuthJwtDTO[] = await this.authRepo.verifyAccount(payload.username, payload.password);
        if (account.length > 0) {
            throw new ForbiddenException('The account has been registered');
        }
        const paramInsert = {
            user_name: payload.username,
            hash: hash
        }
        // đăng ký mới thành công
        await this.authRepo.registerToken(paramInsert);
        const userTemp: AuthJwtDTO[] = await this.authRepo.verifyAccount(payload.username, payload.password);
        const user = {
            user_id: userTemp[0].user_id,
            username: payload.username
        }
        const tokens = await this.getTokens(user.user_id, user.username);
        await this.updateRtHash(user.user_id, tokens.refresh_token);
        return tokens;
    }

    async signinLocal(payload: TokenGenerationReq): Promise<ResponsePayLoad> {
        // check username/password + check bẳng jwt đã được đăng ký chưa

        //check JWT
        const arrUser = await this.authRepo.verifyAccount(payload.username, payload.password);

        if (!arrUser) throw new ForbiddenException('Access Denied');
        const user = _.head(arrUser);
        console.log('user: ', user);

        const passwordMatches = await argon.verify(user.hash, payload.password);
        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(user_id: string): Promise<boolean> {
        await this.authRepo.updateToken(user_id, null);
        return true;
    }

    // refresh token
    async refreshTokens(userId: string, rt: string): Promise<ResponsePayLoad> {
        // const user = await this.prisma.user.findUnique({
        //     where: {
        //       id: userId,
        //     },
        //   });
        const user = {
            hashedRt: "",
            user_id: '1',
            user_name: "",
        }
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.user_id, user.user_name);
        await this.updateRtHash(user.user_id.toString(), tokens.refresh_token);
        return tokens;
    }

    async updateRtHash(userId: string, rt: string): Promise<void> {
        const hash = await argon.hash(rt);
        await this.authRepo.updateToken(userId, hash);
    }

    async getTokens(userId: string, username: string): Promise<ResponsePayLoad> {
        const rolesTemp = [
            {
                parent: 'subAdmin',
                child: ['admin1', 'admin3'],
            },
            {
                parent: 'subEvent',
                child: ['event1', 'event2', 'event4'],
            },
            {
                parent: 'subSetting',
                child: null,
            },
        ]
        const jwtPayload: ProfileAccountWithPermisstion = {
            roles: rolesTemp,
            user_name: username,
            user_id: userId
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({ user: jwtPayload }, {
                secret: this.config.get<string>('AT_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync({ user: jwtPayload }, {
                secret: this.config.get<string>('RT_SECRET'),
                expiresIn: '7d',
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
            user: jwtPayload
        };
    }


    // check account
    verifyPassword(passwordUser: string, passwordLogin: string): boolean {
        const hashPassword = this.passwordService.getHashed(passwordLogin);
        return false;
    }

}
