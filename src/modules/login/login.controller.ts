import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseObj } from 'src/shared';
import { LoginDTO, TokenGenerationReq } from './dto';
import { LoginService } from './login.service';

@ApiTags('Quản lý Account')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  // @UseGuards(JwtGuard)
  // @UseGuards(AuthGuard('jwt'))
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'tạo tài khoản',
  })
  async signup(@Body(ValidationPipe) data: LoginDTO): Promise<ResponseObj> {
    return this.loginService.registerAccount(data);
  }
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Đăng nhập',
  })
  async signin(
    @Body(ValidationPipe) data: TokenGenerationReq,
  ): Promise<ResponseObj> {
    return this.loginService.login(data);
  }

  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Reset Password',
  })
  async ressetPassword(
    @Body(ValidationPipe) data: TokenGenerationReq,
  ): Promise<ResponseObj> {
    return this.loginService.resetPassword(data);
  }

  @Post('update-profile')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'cập nhật profile',
  })
  async updateProfile(
    @Body(ValidationPipe) data: LoginDTO,
  ): Promise<ResponseObj> {
    return this.loginService.updateProfile(data);
  }
}
