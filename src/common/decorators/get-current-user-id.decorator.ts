/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ProfileAccount } from '../../auth/types';
import jwt_decode from "jwt-decode";

export const GetCurrentUserId = createParamDecorator(
  (data: string, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const decoded: any = !token ? null : jwt_decode(token.replace('Bearer ', ''));
    const user = decoded?.user as ProfileAccount;
    return !user ? "" : user.user_id;
  },
);
