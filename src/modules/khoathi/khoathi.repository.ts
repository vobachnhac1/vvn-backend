
import { getConnectionManager, Repository } from "typeorm";
import { KhoathiDTO } from "./dto";

export class KhoathiRepository extends Repository<any>{

  async searchKhoathi(payload: KhoathiDTO): Promise<KhoathiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
      SELECT 
        ROW_NUMBER() OVER (ORDER BY ID DESC) AS ord_numbers,
        ID              AS khoathi_code, 
        NAME            AS khoathi_name,
        ADDRESS         AS khoathi_address,
        NOTE            AS khoathi_note,
        STATUS          AS khoathi_status,
        TYPE            AS khoathi_type,
        CREATED_DATE    AS created_date,
        CREATED_BY      AS created_by,
        MODIFIED_DATE   AS modified_date,
        MODIFIED_BY     AS modified_by
      FROM 
        binhtamao7ys_MOBILE.VVN_KHOATHI 
      WHERE ISDEL ='N'
      AND BOMON_CODE = 'VVN'
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async insertKhoathi(payload: KhoathiDTO): Promise<KhoathiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_KHOATHI
      ( NAME, ADDRESS, TYPE, CREATED_DATE, CREATED_BY, NOTE)
    VALUES
      (
        '${payload.khoathi_name}',
        '${payload.khoathi_address}',
        '${payload.khoathi_type}',
        now(),
        '${payload.username}',
        '${payload.khoathi_note}'
      );
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async updateKhoathi(payload: KhoathiDTO): Promise<KhoathiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_KHOATHI
    SET
      NAME          = '${payload.khoathi_name}',
      ADDRESS       = '${payload.khoathi_address}',
      NOTE          = '${payload.khoathi_note}',
      TYPE          = '${payload.khoathi_type}',
      
      MODIFIED_DATE = now(),
      MODIFIED_BY   = '${payload.username}'
    WHERE ID = '${payload.khoathi_code}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async deletedKhoathi(payload: KhoathiDTO): Promise<KhoathiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_KHOATHI
    SET
      ISDEL = 'Y',
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.username}'
    WHERE ID = '${payload.khoathi_code}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async updateStatusKhoathi(payload: KhoathiDTO): Promise<KhoathiDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_KHOATHI
    SET
      STATUS = '${payload.khoathi_status}',
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.username}'
    WHERE ID = '${payload.khoathi_code}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }
}


