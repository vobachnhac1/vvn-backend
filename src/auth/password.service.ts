/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
const bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  private readonly saltLength: number = 10;

  public getHashed(rawPassword: string): string {
    if (!rawPassword) {
      throw new Error('Please provide a valid string for hashing!');
    }
    const salt = bcrypt.genSaltSync(this.saltLength);
    return bcrypt.hashSync(rawPassword, salt);
  }

  public verifyPassword(rawPassword: string, hashedValue: string): boolean {
    if (!rawPassword || !hashedValue) {
      throw new Error(
        'A raw password and hash value must be non-empty strings!'
      );
    }
    return bcrypt.compareSync(rawPassword, hashedValue);
  }
}
