/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../../auth/types';
import jwt_decode from "jwt-decode";

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const decoded: any = !token ? null : jwt_decode(token.replace('Bearer ', ''));
    const user = decoded?.user as JwtPayloadWithRt;
    if (!data) return user;
    return user[data];
  },
); 
