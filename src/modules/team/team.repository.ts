
import { getConnectionManager, Repository } from "typeorm";
import { TeamDTO } from "./dto";

export class TeamRepository extends Repository<any>{

  async searchTeam(payload: TeamDTO): Promise<TeamDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    SELECT 
      ROW_NUMBER() OVER (ORDER BY ID DESC) AS ord_numbers,
      ID        AS team_code, 
      CLB_NAME  AS team_name,
      ADDRESS   AS team_address,
      NOTE      AS team_note,
      CREATED_DATE  AS created_date,
      CREATED_BY    AS created_by,
      MODIFIED_DATE AS modified_date,
      MODIFIED_BY   AS modified_by
    FROM 
      VVN_TEAM 
    WHERE ISDEL ='N'
    AND BOMON_CODE = 'VVN'
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async insertTeam(payload: TeamDTO): Promise<TeamDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TEAM
      ( CLB_NAME, ADDRESS, CREATED_DATE, CREATED_BY, NOTE)
    VALUES
      (
        '${payload.team_name}',
        '${payload.team_address}',
        now(),
        '${payload.created_by}',
        '${payload.team_note}'
      );
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async updateTeam(payload: TeamDTO): Promise<TeamDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_TEAM
    SET
      CLB_NAME = '${payload.team_name}',
      ADDRESS  = '${payload.team_address}',
      NOTE = '${payload.team_note}',
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.created_by}'
    WHERE ID = '${payload.team_code}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async deletedTeam(payload: TeamDTO): Promise<TeamDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    UPDATE 
      binhtamao7ys_MOBILE.VVN_TEAM
    SET
      ISDEL = 'Y',
      MODIFIED_DATE = now(),
      MODIFIED_BY = '${payload.created_by}'
    WHERE ID = '${payload.team_code}';
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }


}


