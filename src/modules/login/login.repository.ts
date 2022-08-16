import { getConnectionManager, Repository } from 'typeorm';
import { LoginDTO, TokenGenerationReq } from './dto';

export class LoginRepository extends Repository<any> {
  // đã dùng
  async registerAccount(payload: LoginDTO): Promise<LoginDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_ACCOUNT
      ( 
        username,
        password,
        fullname,
        avatarUrl, 
        devicesInfo, 
        email,
        phone,
        expired_token,
        updated_token,
        created_token
      )
    VALUES
      (
        '${payload.username}',
        '${payload.password}',
        '${payload.fullname}',
        '${payload.avatar_url}',
        '${payload.devices_info}',
        '${payload.email}',
        '${payload.phone}',
        now(),
        now(),
        now()
      );
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  // đã dùng
  async verifyAccount(username: string, password: string): Promise<LoginDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
      SELECT 
        id,
        username,
        password,
        fullname,
        avatarUrl as avatar_url,
        roles,
        hash,
        position,
        phone,
        email,
        devicesInfo as device_info,
        createdDate as created_date,
      updatedDate as updated_date
      FROM 
        binhtamao7ys_MOBILE.VVN_ACCOUNT 
      WHERE  upper(username) = upper('${username}')
       
    `;
    // AND password = '${password}'
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async searchAccount(payload: LoginDTO): Promise<LoginDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
      SELECT 
        id,
        username,
        password,
        fullname,
        avatarUrl as avatar_url,
        roles,
        hash,
        position,
        phone,
        email,
        devicesInfo as device_info,
        createdDate as created_date,
      updatedDate as updated_date
      FROM 
        binhtamao7ys_MOBILE.VVN_ACCOUNT 
      WHERE  upper(username) = upper('${payload.username}')
    `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async resetPassword(payload: TokenGenerationReq): Promise<LoginDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
        UPDATE 
          binhtamao7ys_MOBILE.VVN_ACCOUNT
        SET
          password = '${payload.passwordnew}',
          updatedDate = now()
        WHERE  upper(username) = upper('${payload.username}')
    `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async updateProfile(payload: LoginDTO): Promise<LoginDTO[]> {
    const {
      roles,
      avatar_url,
      fullname,
      devices_info,
      email,
      phone,
      username,
      position,
    } = payload;
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
        UPDATE 
          binhtamao7ys_MOBILE.VVN_ACCOUNT
        SET
         ${position ? "position     = '" + position + "'" : ''},
         ${email ? "email        = '" + email + "'" : ''},
         ${roles ? "roles        = '" + roles + "'" : ''},
         ${phone ? "phone        = '" + phone + "'" : ''},
         ${avatar_url ? "avatarUrl    = '" + avatar_url + "'" : ''},
         ${fullname ? "fullname     = '" + fullname + "'" : ''},
         ${devices_info ? "devicesInfo  = '" + devices_info + "'" : ''},
         updatedDate = now()
        WHERE upper(username) = upper('${username}')
    `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  // đã dùng
  async updateToken(user_id: string, hash: string): Promise<LoginDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
        UPDATE 
          binhtamao7ys_MOBILE.VVN_ACCOUNT
        SET
          ${hash ? "hash  = '" + hash + "'" : ''},
          updatedDate = now()
        WHERE id = '${user_id}'
    `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }
}
