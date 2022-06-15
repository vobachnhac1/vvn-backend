/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-30
*------------------------------------------------------- */
import { EntityRepository, Repository, getConnectionManager } from "typeorm";
import { AuthJwtDTO, TokenGenerationReq, AuthUserDTO } from "./dto";
import { UserDemoEntity } from "./auth.entity";

@EntityRepository(UserDemoEntity)
export class AuthJwtRepository extends Repository<AuthJwtDTO>{

    verifyAccount(username: string, password: string): Promise<AuthJwtDTO[]> {
        const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
        const sql =
            `SELECT
            UPPER( BIN_TO_UUID_V2(users.id) ) as id, 
            users.user_name as username,
            users.hash,
            users.hashRF,
            users.expired_token,
            users.updated_token,
            users.created_token
        FROM 
        binhtamao7ys_MOBILE.primatb users
        where users.user_name  = UPPER ('${username}');`;
        const someQuery = entityManager.query(sql);
        return someQuery;
    }

    verifyPassword(username: string, password: string): Promise<boolean> {
        const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
        const sql = `SELECT PASSWORD FROM binhtamao7ys_HOME.ZALO_LOGIN_WEB where ACCOUNTID = '${username}';`;
        const someQuery = entityManager.query(sql);
        return someQuery;
    }

    registerToken(
        user: any
    ): Promise<AuthJwtDTO> {
        const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
        const sql = `
        INSERT INTO 
        binhtamao7ys_MOBILE.primatb
            (
                id,
                user_name,
                hash,
                expired_token,
                updated_token,
                created_token)
            VALUES
            (
                UUID_TO_BIN_V2(uuid()),
                UPPER('${user.user_name}'),
                '${user.hash}',
                now(),
                now(),
                now()
            );
        `;
        const someQuery = entityManager.query(sql);
        return someQuery;
    }

    updateToken(user_id: string, hashRF: string): Promise<any> {
        const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
        const sql = `
        UPDATE 
            binhtamao7ys_MOBILE.primatb
        SET
            hashRF = '${hashRF}',
            updated_token = now()
        WHERE 
            UPPER(BIN_TO_UUID_V2(id)) = UPPER('${user_id}');
        `;
        const someQuery = entityManager.query(sql);
        return someQuery;
    }


    // call fetch api khác 
    // partner VPN -> public IP1, IP2, IP3
    // tắt VPN => sẽ ko sử dụng IP
    // local => services defferent IP1, IP3
    // fetch url IP3 get => phục vụ chức năng của mình

    /***
     *  login=> roles,username,profile
     * roles: database oracle
     * username: database Mysql
     * profile: database DB2
     * 
     * 
     * 
     *  tạo 3 connect đến 3 DB, 
     * 
     * 
     * post comfirm giải thương => userid, giải thương
     * - đéo DBA-  tao cần userid => quyền 
     * 
     */


}