import { getConnectionManager, Repository } from 'typeorm';
import {
  PriorityDTO,
  ProcedureDetailDTO,
  ProcedureDTO,
  StepProcessDTO,
  TaskFileDTO,
  TaskInfoDTO,
  TaskProcessDTO,
} from './dto';

export class TaskRepository extends Repository<any> {
  async getTaskByFilter(payload: TaskInfoDTO): Promise<TaskInfoDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
      SELECT 
        ROW_NUMBER() OVER (ORDER BY ID DESC) AS ord_numbers,
        ID          AS task_id, 
        TOPIC_ID    AS topic_id,
        PRIORITY    AS task_priority,
        TITLE       AS task_title,
        CONTENT     AS task_content,
        STATUS      AS status,

        START_DATE  AS start_date,
        END_DATE    AS end_date,
        CREATED_DATE  AS created_date,
        CREATED_BY    AS created_by,
        UPDATED_DATE  AS updated_date,
        UPDATED_BY    AS updated_by
      FROM 
        VVN_TASK_INFO 
      WHERE STATUS ='Y'
      AND TOPIC_ID = 'VVN'
    `;

    let sqlProcess = `
      SELECT 
          ROW_NUMBER() OVER (ORDER BY POSITION) AS ord_numbers,
          ID            AS  task_process_id,
          TASK_ID       AS task_id,
          STEP_CODE     AS step_code,
          USER_HOLD     AS user_hold,
          CONTENT       AS content_submit,
          CREATED_BY    AS created_by,
          UPDATED_BY    AS updated_by,
          CREATED_DATE  AS created_date,
          UPDATED_DATE  AS updated_date,
          STATUS        AS status,
          PROCEDURE_ID  AS procedure_id,
          START_DATE    AS start_date,
          END_DATE      AS end_date,
          FINISHED_DATE AS finished_date,
          POSITION      AS position
      FROM 
        binhtamao7ys_MOBILE.VVN_TASK_PROCESS
      WHERE 1 =1
    `;

    let someQuery = (await entityManager.query(sql)) as TaskInfoDTO[];
    for (let i = 0; i < someQuery.length; i++) {
      const _sql = sqlProcess + ` AND TASK_ID = '${someQuery[i].task_id}'`;
      const _list = (await entityManager.query(_sql)) as TaskProcessDTO[];
      someQuery[i].listTaskProcess = _list;
    }
    return someQuery;
  }

  async inserTaskInfo(payload: TaskInfoDTO): Promise<TaskInfoDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TASK_INFO
      ( TITLE, CONTENT, PRIORITY, START_DATE, END_DATE, TOPIC_ID, CREATED_BY, CREATED_DATE)
    VALUES
      (
        '${payload.task_title}',
        '${payload.task_content}',
        '${payload.priority}',
        '${payload.start_date}',
        '${payload.end_date}',
        '${payload.topic_id}',
        '${payload.created_by}',
        '${payload.created_date}'
      );
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async inserTaskProcess(payload: TaskProcessDTO): Promise<TaskProcessDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TASK_PROCESS
      ( TASK_ID, STEP_CODE, USER_HOLD, CONTENT, PROCEDURE_ID, START_DATE, END_DATE, FINISHED_DATE, STATUS, POSITION, CREATED_BY, CREATED_DATE)
    VALUES
      (
        '${payload.task_id}',
        '${payload.step_code}',
        '${payload.user_hold}',
        '${payload.content_submit}',
        '${payload.procedure_id}',
        '${payload.start_date}',
        '${payload.end_date}',
        '${payload.finished_date}',
        '${payload.status}',
        '${payload.position}',
        '${payload.created_by}',
        '${payload.created_date}'
      );
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  // tạo mới quy trình task
  async insertProcedure(payload: ProcedureDTO): Promise<ProcedureDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TASK_PROCEDURE
      ( PROCEDURE_NAME, STATUS, CREATED_BY, CREATED_DATE)
    VALUES
      (
        '${payload.procedure_name}', 
        '${payload.status}', 
        '${payload.created_by}', 
        '${payload.created_date}'
      )
    `;

    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async getListProcedure(procedure_code: number): Promise<ProcedureDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    let sql = `
      SELECT 
        ROW_NUMBER() OVER (ORDER BY ID DESC) AS ord_numbers,
        ID                     AS procedure_code, 
        PROCEDURE_NAME         AS procedure_name, 
        STATUS                 AS status, 
        CREATED_DATE           AS created_date, 
        CREATED_BY             AS created_by,         
        UPDATED_DATE           AS updated_date, 
        UPDATED_BY             AS updated_by
      FROM 
        binhtamao7ys_MOBILE.VVN_TASK_PROCEDURE
    `;
    if (procedure_code) {
      sql += ` WHERE ID = '${procedure_code}'`;
    }

    let sql_detail = ` 
      SELECT 
        ROW_NUMBER() OVER (ORDER BY ID asc) AS ord_numbers,
        ID                     AS procedure_detail_code, 
        PROCEDURE_ID           AS procedure_code, 
        PROCEDURE_DETAIL_NAME  AS procedure_detail_name, 
        STATUS                 AS status, 
        STEP_CODE              AS step_code, 
        POSITION               AS position, 
        CREATED_DATE           AS created_date, 
        CREATED_BY             AS created_by,         
        UPDATED_DATE           AS updated_date, 
        UPDATED_BY             AS updated_by
      FROM 
        binhtamao7ys_MOBILE.VVN_TASK_PROCEDURE_DETAIL
      WHERE 1 = 1
        `;
    let someQuery = (await entityManager.query(sql)) as ProcedureDTO[];
    for (let i = 0; i < someQuery.length; i++) {
      const _sql =
        sql_detail + ` AND PROCEDURE_ID ='${someQuery[i].procedure_code}'`;
      const _list = await entityManager.query(_sql);
      someQuery[i].listProcedureDt = _list;
    }
    return someQuery;
  }

  async checkProcedureExist(procedure_code: number): Promise<any> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    let sql = `
      SELECT COUNT(*) AS NUM_EXIST FROM VVN_TASK_PROCEDURE WHERE ID = '${procedure_code}'
    `;
    let rsProcedure = await entityManager.query(sql);
    let rsProcedureDetail;

    if (rsProcedure.length > 0) {
      let _sql = `
        SELECT
          STEP_CODE as step_code,
          POSITION as position
        FROM 
          VVN_TASK_PROCEDURE_DETAIL 
        WHERE PROCEDURE_ID = '${procedure_code}'
      `;
      rsProcedureDetail = (await entityManager.query(
        _sql,
      )) as ProcedureDetailDTO[];
    }
    return {
      numberProcedure: rsProcedure[0].NUM_EXIST || '0',
      numberProcedureDetail: rsProcedureDetail,
    };
  }

  async getListProcedureDetail(
    procedure_code: number,
  ): Promise<ProcedureDetailDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    SELECT 
      ROW_NUMBER() OVER (ORDER BY ID asc) AS ord_numbers,
      ID                     AS procedure_detail_code, 
      PROCEDURE_ID           AS procedure_code, 
      PROCEDURE_DETAIL_NAME         AS procedure_detail_name, 
      STATUS                 AS status, 
      STEP_CODE                 AS step_code, 
      POSITION                 AS position, 
      CREATED_DATE           AS created_date, 
      CREATED_BY             AS created_by,         
      UPDATED_DATE           AS updated_date, 
      UPDATED_BY             AS updated_by
    FROM 
      binhtamao7ys_MOBILE.VVN_TASK_PROCEDURE_DETAIL
    WHERE 1 = 1
    AND PROCEDURE_ID ='${procedure_code}'
    `;
    console.log('sql: ', sql);
    let someQuery = entityManager.query(sql);
    return someQuery;
  }

  async insertProcedureDetail(
    payload: ProcedureDetailDTO,
  ): Promise<ProcedureDetailDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TASK_PROCEDURE_DETAIL
      ( PROCEDURE_ID, PROCEDURE_DETAIL_NAME, STEP_CODE, STATUS, POSITION, CREATED_BY, CREATED_DATE)
    VALUES
      (
        '${payload.procedure_code}', 
        '${payload.procedure_detail_name}', 
        '${payload.step_code}', 
        '${payload.status}', 
        '${payload.position}', 
        '${payload.created_by}', 
        '${payload.created_date}'
      )
    `;

    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async inserTaskFile(payload: TaskFileDTO): Promise<TaskInfoDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TASK_FILE
      ( TASK_ID, FILENAME, TYPE, WIDTH, HEIGHT, STEP, STATUS,  CREATED_BY, CREATED_DATE)
    VALUES
      (
        '${payload.task_id}',
        '${payload.file_name}',
        '${payload.type}',
        '${payload.width}',
        '${payload.height}',
        '${payload.step}',
        '${payload.status}',
        '${payload.created_by}',
        '${payload.created_date}'
      );
  `;
    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  // lấy danh mục Priority
  async insertPriority(payload: PriorityDTO): Promise<PriorityDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TASK_PRIORITY
      ( PRIORITY_CODE, PRIORITY_NAME, STATUS, CREATED_BY, CREATED_DATE)
    VALUES
      (
        '${payload.priority_code}', 
        '${payload.priority_name}', 
        '${payload.status}', 
        '${payload.created_by}', 
        '${payload.created_date}'
      )
    `;

    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async getListPriority(): Promise<PriorityDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
      SELECT 
        ROW_NUMBER() OVER (ORDER BY ID DESC) AS ord_numbers,
        PRIORITY_CODE          AS priority_code, 
        PRIORITY_NAME          AS priority_name, 
        STATUS                 AS status, 
        CREATED_DATE           AS created_date, 
        CREATED_BY             AS created_by,         
        UPDATED_DATE           AS updated_date, 
        UPDATED_BY             AS updated_by
      FROM 
        binhtamao7ys_MOBILE.VVN_TASK_PRIORITY
    `;

    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  // lấy danh mục Step Process
  async insertStepProcess(payload: StepProcessDTO): Promise<StepProcessDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
    INSERT INTO binhtamao7ys_MOBILE.VVN_TASK_STEP
      ( STEP_CODE, STEP_NAME, STATUS, CREATED_BY, CREATED_DATE)
    VALUES
      (
        '${payload.step_code}', 
        '${payload.step_name}', 
        '${payload.status}', 
        '${payload.created_by}', 
        '${payload.created_date}'
      )
    `;

    const someQuery = entityManager.query(sql);
    return someQuery;
  }

  async getListStepProcess(): Promise<StepProcessDTO[]> {
    const entityManager = getConnectionManager().get('MYSQL_CONNECTION_DEMO');
    const sql = `
      SELECT 
        ROW_NUMBER() OVER (ORDER BY ID DESC) AS ord_numbers,
        STEP_CODE             AS step_code, 
        STEP_NAME             AS step_name, 
        STATUS                AS status, 
        CREATED_DATE          AS created_date, 
        CREATED_BY            AS created_by,         
        UPDATED_DATE          AS updated_date, 
        UPDATED_BY            AS updated_by
      FROM 
        binhtamao7ys_MOBILE.VVN_TASK_STEP
    `;

    const someQuery = entityManager.query(sql);
    return someQuery;
  }
}
