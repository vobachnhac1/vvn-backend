import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'src/logging';
import { ResponseObj } from 'src/shared';
import { ChamThiDTO, ListUpdate, ScoreSpeed, UploadFile } from './dto';
import { ChamThiRepository } from './chamthi.repository';
const __ = require('lodash');

@Injectable()
export class ChamThiService {
  private readonly logger: Logger = new Logger(ChamThiService.name);
  constructor(
    @InjectRepository(ChamThiRepository) private chamthiRepo: ChamThiRepository,
  ) {}

  async searchChamThi(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.chamthiRepo.searchChamThi(payload);
      response.message = 'Lấy danh sách CLB thành công';
      response.data = result;
      return response;
    } catch (error) {
      this.logger.error('search Team', error);
      return response;
    }
  }

  async insertChamthi(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.chamthiRepo.insertChamthi(payload);
      response.message = 'Thêm mới Item Chấm thi thành công';
      return response;
    } catch (error) {
      this.logger.error('insert ChamThiDTO', error);
      return response;
    }
  }

  async updateChamthi(payload: ListUpdate): Promise<ResponseObj> {
    let response = new ResponseObj();
    const { data, username } = payload;
    try {
      for (let i = 0; i < data.length; i++) {
        const result = await this.chamthiRepo.updateChamthi({
          ...data[i],
          username,
        });
      }
      response.message = 'Cập nhật thông tin Item Chấm thi thành công';
      return response;
    } catch (error) {
      this.logger.error('Updated ChamThiDTO', error);
      return response;
    }
  }

  async deletedChamthi(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.chamthiRepo.deletedChamthi(payload);
      response.message = 'Xóa thông tin Item Chấm thi thành công';
      return response;
    } catch (error) {
      this.logger.error('deleted ChamThiDTO', error);
      return response;
    }
  }

  async uploadListChamThi(payload: UploadFile): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const { data, username } = payload;
      for (let i = 0; i < data.length; i++) {
        await this.chamthiRepo.insertChamthi({ ...data[i], username });
      }
      // const result = await this.chamthiRepo.deletedChamthi(payload);
      // console.log('result: ', result);
      response.message = 'Upload file Sheet thành công Chấm thi thành công';
      return response;
    } catch (error) {
      this.logger.error('deleted ChamThiDTO', error);
      return response;
    }
  }

  async scoreSpeed(payload: ScoreSpeed): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const param: ChamThiDTO = new ChamThiDTO();
      param.diem_cb =
        CHILD_OF_KHOATHI[0].id === payload.content_code ? payload.diem : null;
      param.diem_dk =
        CHILD_OF_KHOATHI[2].id === payload.content_code ? payload.diem : null;
      param.diem_dl =
        CHILD_OF_KHOATHI[1].id === payload.content_code ? payload.diem : null;
      param.diem_tl =
        CHILD_OF_KHOATHI[3].id === payload.content_code ? payload.diem : null;
      param.diem_lt =
        CHILD_OF_KHOATHI[5].id === payload.content_code ? payload.diem : null;
      param.diem_sl =
        CHILD_OF_KHOATHI[4].id === payload.content_code ? payload.diem : null;
      param.modified_by = payload.modified_by;
      param.khoathi_code = payload.khoathi_code;
      param.level_code = payload.level_code;
      const result = await this.chamthiRepo.scoreSpeed(param);
      response.message = 'Cập nhật điểm thành công';
      return response;
    } catch (error) {
      this.logger.error('Cập nhật điểm scoreSpeed', error);
      return response;
    }
  }

  async sortRank(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const list = await this.chamthiRepo.sortRank(payload);
      response.data = list;
      response.message = 'Lấy danh sách xếp hạng thành công';
      return response;
    } catch (error) {
      this.logger.error('sortRank', error);
      return response;
    }
  }

  async downloadFile(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const { khoathi_code } = payload;
      const list = await this.chamthiRepo.downloadFile(khoathi_code);
      response.data = list;
      response.message = 'Lấy danh sách tổng thành công';
      return response;
    } catch (error) {
      this.logger.error('downloadFile', error);
      return response;
    }
  }
  async getTeamByKhoathi(payload: string): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      // const {} =payload;
      const list = await this.chamthiRepo.getTeamByKhoathi(payload);
      response.data = list;
      response.message = 'Lấy danh sách tổng thành công';
      return response;
    } catch (error) {
      this.logger.error('downloadFile', error);
      return response;
    }
  }
}

export const CHILD_OF_KHOATHI = [
  {
    id: 'CANBAN',
    name: 'Căn bản',
  },
  {
    id: 'DONLUYEN',
    name: 'Đơn luyện',
  },
  {
    id: 'DOIKHANG',
    name: 'Đối kháng',
  },
  {
    id: 'THELUC',
    name: 'Thể Lực',
  },
  {
    id: 'SONGLUYEN',
    name: 'Song luyện',
  },
  {
    id: 'LYTHUYET',
    name: 'Lý thuyết',
  },
];
