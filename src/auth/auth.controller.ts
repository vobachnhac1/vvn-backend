/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import { Controller, HttpCode, Post, Body, HttpStatus, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { AuthService } from './auth.service';
import { TokenGenerationReq } from './dto';
import { RtGuard } from './guards';
import { ResponsePayLoad } from './types';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body(ValidationPipe) dto: TokenGenerationReq): Promise<ResponsePayLoad> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: TokenGenerationReq): Promise<ResponsePayLoad> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@GetCurrentUserId() user_id: string): Promise<boolean> {
    return this.authService.logout(user_id);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() user_id: string,
    @GetCurrentUser('refreshToken') refresh_token: string,
  ): Promise<ResponsePayLoad> {
    return this.authService.refreshTokens(user_id, refresh_token);
  }
}
