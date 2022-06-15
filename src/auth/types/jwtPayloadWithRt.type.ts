import { ProfileAccount } from '.';
export type JwtPayloadWithRt = ProfileAccount & { refreshToken: string };
