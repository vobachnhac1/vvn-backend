
import { getConnectionManager, Repository } from "typeorm";
import { ChamThiDTO } from "./dto";

export class ChamThiRepository extends Repository<any>{

  async searchChamThi(payload: ChamThiDTO): Promise<ChamThiDTO[]> {
    const {gender,khoathi_code,level_code} =payload;
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
      HANG        AS hang,
      CREATED_DATE  AS created_date,
      CREATED_BY    AS created_by,
      MODIFIED_DATE AS modified_date,
      MODIFIED_BY   AS modified_by
    FROM 
      binhtamao7ys_MOBILE.VVN_CHAMTHI 
    WHERE ISDEL ='N'
    AND BOMON_CODE = 'VVN'
    ${gender? " AND GENDER = '" + gender +"'" :""}
    ${khoathi_code? " AND KHOATHI = '" + khoathi_code +"'" :""}
    ${level_code? " AND LEVEL = '" + level_code +"'" :""}
    
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
        '${payload.created_by}'
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
      team
    } = payload;
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_CHAMTHI
    SET
      ${ fullname? " FULLNAME = '" + fullname + "'," : ""}
      ${ level_code? " LEVEL = '" + level_code + "'," : ""}
      ${ gender? " GENDER = '" + gender + "'," : ""}
      ${ team? " TEAM = '" + team + "'," : ""}
      ${ dob? " DOB = '" + dob + "'," : ""}
      ${ diem_cb? " DIEM_CB = '" + diem_cb + "'," : ""}
      ${ diem_dk? " DIEM_DK = '" + diem_dk + "'," : ""}
      ${ diem_dl? " DIEM_DL = '" + diem_dl + "'," : ""}
      ${ diem_lt? " DIEM_LT = '" + diem_lt + "'," : ""}
      ${ diem_sl? " DIEM_SL = '" + diem_sl + "'," : ""}
      ${ diem_tl? " DIEM_TL = '" + diem_tl + "'," : ""}
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.modified_by}'
    WHERE ID = '${payload.mathi}';
  `;
    const someQuery = entityManager.query(sql);
    console.log('sql: ', sql);
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
      MODIFIED_BY = '${payload.created_by}'
    WHERE ID = '${payload.mathi}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

}


