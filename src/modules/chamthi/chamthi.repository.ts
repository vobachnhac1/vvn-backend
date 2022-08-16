import { getConnectionManager, Repository } from 'typeorm';
import { ChamThiDTO } from './dto';

export class ChamThiRepository extends Repository<any> {
  async searchChamThi(payload: ChamThiDTO): Promise<ChamThiDTO[]> {
    const { gender, khoathi_code, level_code } = payload;
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    SELECT 
      ROW_NUMBER() OVER (ORDER BY ID DESC) AS ord_numbers,
      ID          AS mathi, 
      KHOATHI     AS khoathi_code, 
      FULLNAME    AS fullname,
      LEVEL       AS level_code,
      GENDER      AS gender,
      DOB         AS dob,
      TEAM        AS team,
      DIEM_CB     AS diem_cb,
      DIEM_DK     AS diem_dk,
      DIEM_TL     AS diem_tl,
      DIEM_SL     AS diem_sl,
      DIEM_DL     AS diem_dl,
      DIEM_LT     AS diem_lt,
      DIEM_TONG   AS diem_tong,
      ( DIEM_CB+ DIEM_DK + DIEM_TL + DIEM_SL + DIEM_DL + DIEM_LT )   AS diem_tong_rt,
      HANG        AS hang,
      CREATED_DATE  AS created_date,
      CREATED_BY    AS created_by,
      MODIFIED_DATE AS modified_date,
      MODIFIED_BY   AS modified_by
    FROM 
      binhtamao7ys_MOBILE.VVN_CHAMTHI 
    WHERE ISDEL ='N'
    AND BOMON_CODE = 'VVN'
    ${gender ? " AND GENDER = '" + gender + "'" : ''}
    ${khoathi_code ? " AND KHOATHI = '" + khoathi_code + "'" : ''}
    ${level_code ? " AND LEVEL = '" + level_code + "'" : ''}
    
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async insertChamthi(payload: ChamThiDTO): Promise<ChamThiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_CHAMTHI
      (KHOATHI, FULLNAME, LEVEL, GENDER, DOB, TEAM, CREATED_DATE, CREATED_BY)
    VALUES
      (
        '${payload.khoathi_code}',
        '${payload.fullname}',
        '${payload.level_code}',
        '${payload.gender}',
        '${payload.dob}',
        '${payload.team}',
        now(),
        '${payload.username}'
      );
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async updateChamthi(payload: ChamThiDTO): Promise<ChamThiDTO[]> {
    const {
      diem_cb,
      diem_dk,
      diem_dl,
      diem_lt,
      diem_sl,
      diem_tl,
      fullname,
      level_code,
      dob,
      gender,
      team,
    } = payload;
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const _diem_cb = diem_cb ? " '" + diem_cb + "' " : ' DIEM_CB ';
    const _diem_dk = diem_dk ? " '" + diem_dk + "' " : ' DIEM_DK ';
    const _diem_dl = diem_dl ? " '" + diem_dl + "' " : ' DIEM_DK ';
    const _diem_lt = diem_lt ? " '" + diem_lt + "' " : ' DIEM_LT ';
    const _diem_sl = diem_sl ? " '" + diem_sl + "' " : ' DIEM_SL ';
    const _diem_tl = diem_tl ? " '" + diem_tl + "' " : ' DIEM_TL ';

    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_CHAMTHI
    SET
      DIEM_TONG =  ${_diem_cb} + ${_diem_dk} + ${_diem_dl} + ${_diem_lt} + ${_diem_sl} + ${_diem_tl} ,
      ${fullname ? " FULLNAME = '" + fullname + "'," : ''}
      ${level_code ? " LEVEL = '" + level_code + "'," : ''}
      ${gender ? " GENDER = '" + gender + "'," : ''}
      ${team ? " TEAM = '" + team + "'," : ''}
      ${dob ? " DOB = '" + dob + "'," : ''}
      ${diem_cb ? " DIEM_CB = '" + diem_cb + "'," : ''}
      ${diem_dk ? " DIEM_DK = '" + diem_dk + "'," : ''}
      ${diem_dl ? " DIEM_DL = '" + diem_dl + "'," : ''}
      ${diem_lt ? " DIEM_LT = '" + diem_lt + "'," : ''}
      ${diem_sl ? " DIEM_SL = '" + diem_sl + "'," : ''}
      ${diem_tl ? " DIEM_TL = '" + diem_tl + "'," : ''}
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.username}'
    WHERE ID = '${payload.mathi}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async deletedChamthi(payload: ChamThiDTO): Promise<ChamThiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_CHAMTHI
    SET
      ISDEL = 'Y',
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.username}'
    WHERE ID = '${payload.mathi}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async scoreSpeed(payload: ChamThiDTO): Promise<ChamThiDTO[]> {
    const {
      diem_cb,
      diem_dk,
      diem_dl,
      diem_lt,
      diem_sl,
      diem_tl,
      khoathi_code,
      level_code,
    } = payload;
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const _diem_cb = diem_cb ? " '" + diem_cb + "' " : ' DIEM_CB ';
    const _diem_dk = diem_dk ? " '" + diem_dk + "' " : ' DIEM_DK ';
    const _diem_dl = diem_dl ? " '" + diem_dl + "' " : ' DIEM_DK ';
    const _diem_lt = diem_lt ? " '" + diem_lt + "' " : ' DIEM_LT ';
    const _diem_sl = diem_sl ? " '" + diem_sl + "' " : ' DIEM_SL ';
    const _diem_tl = diem_tl ? " '" + diem_tl + "' " : ' DIEM_TL ';
    await entityManager.query('SET SQL_SAFE_UPDATES = 0');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_CHAMTHI
    SET
      ${diem_cb ? " DIEM_CB = '" + diem_cb + "'," : ''}
      ${diem_dk ? " DIEM_DK = '" + diem_dk + "'," : ''}
      ${diem_dl ? " DIEM_DL = '" + diem_dl + "'," : ''}
      ${diem_lt ? " DIEM_LT = '" + diem_lt + "'," : ''}
      ${diem_sl ? " DIEM_SL = '" + diem_sl + "'," : ''}
      ${diem_tl ? " DIEM_TL = '" + diem_tl + "'," : ''}
      DIEM_TONG =  ${_diem_cb} + ${_diem_dk} + ${_diem_dl} + ${_diem_lt} + ${_diem_sl} + ${_diem_tl} ,
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.username}'
    WHERE  LEVEL = '${level_code}'
      ${diem_cb ? "AND DIEM_CB IN ('0.0')" : ''}
      ${diem_dk ? "AND DIEM_DK IN ('0.0')" : ''}
      ${diem_dl ? "AND DIEM_DL IN ('0.0')" : ''}
      ${diem_lt ? "AND DIEM_LT IN ('0.0')" : ''}
      ${diem_sl ? "AND DIEM_SL IN ('0.0')" : ''}
      ${diem_tl ? "AND DIEM_TL IN ('0.0')" : ''}
      AND KHOATHI = '${khoathi_code}'
    ;
  `;
    const someQuery = await entityManager.query(sql);
    entityManager.query('SET SQL_SAFE_UPDATES = 1');
    return someQuery;
  }

  async sortRank(payload: ChamThiDTO): Promise<ChamThiDTO[]> {
    const { gender, khoathi_code, level_code } = payload;
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');

    const sql = `
    SELECT 
      ROW_NUMBER() OVER (ORDER BY DIEM_TONG DESC) AS ord_numbers,
      ID          AS mathi, 
      KHOATHI     AS khoathi_code, 
      FULLNAME    AS fullname,
      LEVEL       AS level_code,
      GENDER      AS gender,
      DOB         AS dob,
      TEAM        AS team,
      DIEM_CB     AS diem_cb,
      DIEM_DK     AS diem_dk,
      DIEM_TL     AS diem_tl,
      DIEM_SL     AS diem_sl,
      DIEM_DL     AS diem_dl,
      DIEM_LT     AS diem_lt,
      DIEM_TONG   AS diem_tong,
      HANG        AS hang,
      CREATED_DATE  AS created_date,
      CREATED_BY    AS created_by,
      MODIFIED_DATE AS modified_date,
      MODIFIED_BY   AS modified_by
    FROM 
      binhtamao7ys_MOBILE.VVN_CHAMTHI 
    WHERE ISDEL ='N'
    AND BOMON_CODE = 'VVN'
    ${gender ? " AND GENDER = '" + gender + "'" : ''}
    ${khoathi_code ? " AND KHOATHI = '" + khoathi_code + "'" : ''}
    ${level_code ? " AND LEVEL = '" + level_code + "'" : ''}
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async downloadFile(khoathi_code: string): Promise<any> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sqlheader = `
      WITH DB_CONTENT
        AS
        (
          select distinct 
            LEVEL, 
            GENDER, 
            KHOATHI 
          from
            binhtamao7ys_MOBILE.VVN_CHAMTHI 
          where  KHOATHI = '${khoathi_code}' 
            and ISDEL ='N' 
            and BOMON_CODE ='VVN' 
          )
      SELECT
        ROW_NUMBER() OVER (ORDER BY LEVEL DESC) AS ord_numbers,
        LEVEL  as level_code,
        GENDER as gender, 
        KHOATHI  as khoathi_code,
        ( 
          select 
            count(*) 
          from 
            VVN_CHAMTHI 
          where LEVEL = level_code 
          and KHOATHI = '${khoathi_code}' 
          and ISDEL ='N' 
          and BOMON_CODE ='VVN'
        )  as total
      FROM DB_CONTENT`;

    const sql = `
        SELECT 
          ROW_NUMBER() OVER (ORDER BY DIEM_TONG DESC) AS ord_numbers,
          ID          AS mathi, 
          KHOATHI     AS khoathi_code, 
          FULLNAME    AS fullname,
          LEVEL       AS level_code,
          GENDER      AS gender,
          DOB         AS dob,
          TEAM        AS team,
          DIEM_CB     AS diem_cb,
          DIEM_DK     AS diem_dk,
          DIEM_TL     AS diem_tl,
          DIEM_SL     AS diem_sl,
          DIEM_DL     AS diem_dl,
          DIEM_LT     AS diem_lt,
          DIEM_TONG   AS diem_tong,
          HANG        AS hang,
          CREATED_DATE  AS created_date,
          CREATED_BY    AS created_by,
          MODIFIED_DATE AS modified_date,
          MODIFIED_BY   AS modified_by
        FROM 
          binhtamao7ys_MOBILE.VVN_CHAMTHI 
        WHERE ISDEL ='N'
        AND BOMON_CODE = 'VVN'
        and KHOATHI = '${khoathi_code}' 
      `;
    const reHeader = await entityManager.query(sqlheader);
    const rsContent: ChamThiDTO[] = await entityManager.query(sql);
    return {
      header: reHeader,
      content: rsContent,
      lengthContent: rsContent.length,
    };
  }

  async getTeamByKhoathi(payload: string): Promise<ChamThiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    SELECT 
      ROW_NUMBER() OVER (ORDER BY TB.TEAM DESC) AS ord_numbers,
      TB.TEAM as team
    FROM (
    select distinct TEAM  from 	binhtamao7ys_MOBILE.VVN_CHAMTHI where KHOATHI = '${payload}'
    ) TB
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }
}
