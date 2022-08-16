/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-03-30
 *------------------------------------------------------- */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoginDTO } from '../dto';
import jwt_decode from 'jwt-decode';

export const GetCurrentUser = createParamDecorator(
  (data: keyof any | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const decoded: any = !token
      ? null
      : jwt_decode(token.replace('Bearer ', ''));
    const user = decoded?.user as LoginDTO;
    if (!data) return user;
    return user[data];
  },
);
