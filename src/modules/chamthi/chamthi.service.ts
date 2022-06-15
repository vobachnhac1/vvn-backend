import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "src/logging";
import { ResponseObj } from "src/shared";
import { ChamThiDTO, UploadFile } from "./dto";
import { ChamThiRepository } from "./chamthi.repository";
const __ = require('lodash');

@Injectable()
export class ChamThiService {
  private readonly logger: Logger = new Logger(ChamThiService.name);
  constructor(
    @InjectRepository(ChamThiRepository) private chamthiRepo: ChamThiRepository,
  ) { }

  async searchChamThi(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.chamthiRepo.searchChamThi(payload);
      response.message = "Lấy danh sách CLB thành công";
      response.data = result;
      return response;
    } catch (error) {
      this.logger.error("search Team", error)
      return response;
    }
  }

  async insertChamthi(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.chamthiRepo.insertChamthi(payload);
      response.message = "Thêm mới Item Chấm thi thành công";
      return response;
    } catch (error) {
      this.logger.error("insert ChamThiDTO", error)
      return response;
    }
  }

  async updateChamthi(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.chamthiRepo.updateChamthi(payload);
      response.message = "Cập nhật thông tin Item Chấm thi thành công";
      return response;
    } catch (error) {
      this.logger.error("Updated ChamThiDTO", error)
      return response;
    }
  }
   
  async deletedChamthi(payload: ChamThiDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.chamthiRepo.deletedChamthi(payload);
      response.message = "Xóa thông tin Item Chấm thi thành công";
      return response;
    } catch (error) {
      this.logger.error("deleted ChamThiDTO", error)
      return response;
    }
  }
  
  async uploadListChamThi(payload: UploadFile): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const{data, user_id} = payload;
      for(let i =0; i<data.length; i++){
          await this.chamthiRepo.insertChamthi(data[i]);
      }
      // const result = await this.chamthiRepo.deletedChamthi(payload);
      // console.log('result: ', result);
      response.message = "Upload file Sheet thành công Chấm thi thành công";
      return response;
    } catch (error) {
      this.logger.error("deleted ChamThiDTO", error)
      return response;
    }
  }

}