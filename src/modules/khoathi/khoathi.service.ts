import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'src/logging';
import { ResponseObj } from 'src/shared';
import { KhoathiDTO } from './dto';
import { KhoathiRepository } from './khoathi.repository';
const __ = require('lodash');

@Injectable()
export class KhoathiService {
  private readonly logger: Logger = new Logger(KhoathiService.name);
  constructor(
    @InjectRepository(KhoathiRepository) private KhoathiRepo: KhoathiRepository,
  ) {}

  async searchKhoathi(payload: KhoathiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.KhoathiRepo.searchKhoathi(payload);
      response.message = 'Lấy danh sách khóa thi thành công';
      response.data = result;
      return response;
    } catch (error) {
      this.logger.error('search Khoathi', error);
      return response;
    }
  }

  async insertKhoathi(payload: KhoathiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.KhoathiRepo.insertKhoathi(payload);
      response.message = 'Thêm mới khóa thi thành công';
      return response;
    } catch (error) {
      this.logger.error('insert Khoathi', error);
      return response;
    }
  }

  async updatedKhoathi(payload: KhoathiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.KhoathiRepo.updateKhoathi(payload);
      response.message = 'Cập nhật thông tin khóa thi thành công';
      return response;
    } catch (error) {
      this.logger.error('Updated Khoathi', error);
      return response;
    }
  }

  async deletedKhoathi(payload: KhoathiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.KhoathiRepo.deletedKhoathi(payload);
      response.message = 'Xóa khóa thi thành công';
      return response;
    } catch (error) {
      this.logger.error('Updated Khoathi', error);
      return response;
    }
  }

  async updateStatusKhoathi(payload: KhoathiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.KhoathiRepo.updateStatusKhoathi(payload);
      response.message = 'Cập nhật trạng thái khóa thi thành công';
      return response;
    } catch (error) {
      this.logger.error('Updated Khoathi', error);
      return response;
    }
  }
}
