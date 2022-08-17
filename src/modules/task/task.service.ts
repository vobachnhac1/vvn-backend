import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'src/logging';
import { ResponseObj } from 'src/shared';
import {
  PriorityDTO,
  ProcedureDTO,
  StepProcessDTO,
  TaskDTO,
  TaskFileDTO,
  TaskInfoDTO,
} from './dto';
import { TaskRepository } from './task.repository';
const __ = require('lodash');
const moment = require('moment');

@Injectable()
export class TaskService {
  private readonly logger: Logger = new Logger(TaskService.name);
  constructor(
    @InjectRepository(TaskRepository) private taskRepo: TaskRepository,
  ) {}

  async getTaskByFilter(payload: TaskInfoDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.taskRepo.getTaskByFilter(payload);
      response.message = 'Lấy danh sách task thành công';
      response.data = result;
      return response;
    } catch (error) {
      this.logger.error('search task', error);
      return response;
    }
  }

  async createTask(payload: TaskDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const { task_info, task_file, task_process } = payload;
      const _time = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log('_time: ', _time);
      // insert task info
      let _taskInfo = task_info as TaskInfoDTO;
      // check valid procedureCode
      const _rsCheckProcedure = await this.taskRepo.checkProcedureExist(
        _taskInfo.procedure_code,
      );
      if (parseInt(_rsCheckProcedure['numberProcedure']) == 0) {
        response.message = 'Mã quy trình không tồn tại trong hệ thống';
        response.success = false;
        return response;
      } else {
        if (
          _rsCheckProcedure['numberProcedureDetail'].length !=
          task_process.length
        ) {
          response.message = 'Số lượng task process không hợp lệ';
          response.success = false;
          return response;
        } else {
          // step_code và position của task so với quy trình
          const _listProcedureDt = _rsCheckProcedure['numberProcedureDetail'];
          let valid = 0;
          for (let i = 0; i < task_process.length; i++) {
            const _temp = _listProcedureDt.filter(
              (item) =>
                item.position == task_process[i].position &&
                item.step_code == task_process[i].step_code,
            );
            valid += _temp.length;
          }
          // kiểm tra vị trí + mã step có hợp lệ không
          if (valid != _listProcedureDt.length) {
            response.message = 'Thứ tự task process không hợp lệ';
            response.success = false;
            return response;
          }
        }
      }

      // check number process insert with system
      _taskInfo.created_date = _time;
      const rsTaskInfo = await this.taskRepo.inserTaskInfo(_taskInfo);
      if (rsTaskInfo['insertId'] != '0') {
        let _taskProcess = task_process;
        for (let i = 0; i < _taskProcess.length; i++) {
          _taskProcess[i].task_id = rsTaskInfo['insertId'];
          _taskProcess[i].created_date = _time;
          const _rsTaskProcess = await this.taskRepo.inserTaskProcess(
            _taskProcess[i],
          );
        }
        // // insert task file neu co
        let _taskFile = task_file;
        _taskFile.task_id = rsTaskInfo['insertId'];
        _taskFile.created_date = _time;
        const rsTaskFile = await this.taskRepo.inserTaskFile(_taskFile);
        response.message = 'Tạo task thành công';
      } else {
        response.message = 'Tạo task thất bại';
      }
      response.data = _rsCheckProcedure;
      return response;
    } catch (error) {
      this.logger.error('created task false', error);
      return response;
    }
  }

  async insertPriority(payload: PriorityDTO): Promise<ResponseObj> {
    let resp = new ResponseObj();
    const _time = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      payload.created_date = _time;
      const rsInsert = await this.taskRepo.insertPriority(payload);
      console.log('rsInsert: ', rsInsert);
      if (rsInsert['insertId'] != '0') {
        resp.message = 'Tạo Priority thành công';
      } else {
        resp.message = 'Tạo Priority thất bại';
      }
      return resp;
    } catch (error) {
      return resp;
    }
  }

  async insertStepProcess(payload: StepProcessDTO): Promise<ResponseObj> {
    let resp = new ResponseObj();
    const _time = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      payload.created_date = _time;
      const rsInsert = await this.taskRepo.insertStepProcess(payload);
      if (rsInsert['insertId'] != '0') {
        resp.message = 'Tạo StepProcess thành công';
      } else {
        resp.message = 'Tạo StepProcess thất bại';
      }
      return resp;
    } catch (error) {
      return resp;
    }
  }

  async getListPriority(payload: PriorityDTO): Promise<ResponseObj> {
    let resp = new ResponseObj();
    // const _time = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      const rsList = await this.taskRepo.getListPriority();
      resp.data = rsList;
      resp.message = 'Get List Priority thành công';
      return resp;
    } catch (error) {
      return resp;
    }
  }

  async getListStepProcess(payload: StepProcessDTO): Promise<ResponseObj> {
    let resp = new ResponseObj();
    // const _time = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      const rsList = await this.taskRepo.getListStepProcess();
      resp.data = rsList;
      resp.message = 'Get List StepProcess thành công';
      return resp;
    } catch (error) {
      return resp;
    }
  }

  // function Insert Procedure
  async insertProcedure(payload: ProcedureDTO): Promise<ResponseObj> {
    let resp = new ResponseObj();
    const _time = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      payload.created_date = _time;
      const rsInsertProcedure = await this.taskRepo.insertProcedure(payload);
      if (rsInsertProcedure['insertId'] != '0') {
        // insert procedure detail
        for (let i = 0; i < payload.listProcedureDt.length; i++) {
          payload.listProcedureDt[i].created_date = _time;
          payload.listProcedureDt[i].procedure_code =
            rsInsertProcedure['insertId'];
          const _insertDt = await this.taskRepo.insertProcedureDetail(
            payload.listProcedureDt[i],
          );
        }
        resp.message = 'Tạo Procedure thành công';
      } else {
        resp.message = 'Tạo Procedure thất bại';
      }
      return resp;
    } catch (error) {
      return resp;
    }
  }

  async getListProcedure(payload: StepProcessDTO): Promise<ResponseObj> {
    let resp = new ResponseObj();
    // const _time = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      const rsList = await this.taskRepo.getListProcedure(null);
      resp.data = rsList;
      resp.message = 'Get List Procedure thành công';
      return resp;
    } catch (error) {
      return resp;
    }
  }

  async getListProcedureDetail(procedure_code: number): Promise<ResponseObj> {
    let resp = new ResponseObj();
    // const _time = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      const rsList = await this.taskRepo.getListProcedureDetail(procedure_code);
      resp.data = rsList;
      resp.message = 'Get List Procedure Detail thành công';
      return resp;
    } catch (error) {
      return resp;
    }
  }
}
