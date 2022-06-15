import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "src/logging";
import { ResponseObj } from "src/shared";
import { TeamDTO } from "./dto";
import { TeamRepository } from "./team.repository";
const __ = require('lodash');

@Injectable()
export class TeamService {
  private readonly logger: Logger = new Logger(TeamService.name);
  constructor(
    @InjectRepository(TeamRepository) private teamRepo: TeamRepository,
  ) { }

  async searchTeam(payload: TeamDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.teamRepo.searchTeam(payload);
      response.message = "Lấy danh sách CLB thành công";
      response.data = result;
      return response;
    } catch (error) {
      this.logger.error("search Team", error)
      return response;
    }
  }

  async insertTeam(payload: TeamDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.teamRepo.insertTeam(payload);
      response.message = "Thêm mới CLB thành công";
      return response;
    } catch (error) {
      this.logger.error("insert Team", error)
      return response;
    }
  }

  async updatedTeam(payload: TeamDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.teamRepo.updateTeam(payload);
      response.message = "Cập nhật thông tin CLB thành công";
      return response;
    } catch (error) {
      this.logger.error("Updated Team", error)
      return response;
    }
  }
   
  async deletedTeam(payload: TeamDTO): Promise<ResponseObj> {
    let response = new ResponseObj();
    try {
      const result = await this.teamRepo.deletedTeam(payload);
      response.message = "Cập nhật thông tin CLB thành công";
      return response;
    } catch (error) {
      this.logger.error("Updated Team", error)
      return response;
    }
  }

}