import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseObj } from "src/shared";
import { GetCurrentUser } from "../login/decorators";
import { TeamDTO } from "./dto";
import { TeamService } from "./team.service";

@ApiTags('Quản lý câu lạc bộ')
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) { }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách câu lạc bộ'
  })
  async searchTeam(
    @GetCurrentUser(ValidationPipe) data: TeamDTO): Promise<ResponseObj> {
    return this.teamService.searchTeam(data);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Thêm mới câu lạc bộ (đơn vị)'
  })
  async insertTeam(@Body(ValidationPipe) data: TeamDTO): Promise<ResponseObj> {
    return this.teamService.insertTeam(data);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Cập nhật câu lạc bộ (đơn vị)'
  })
  async updatedTeam(@Body(ValidationPipe) data: TeamDTO): Promise<ResponseObj> {
    return this.teamService.updatedTeam(data);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Xóa câu lạc bộ (đơn vị)'
  })
  async deletedTeam(@Body(ValidationPipe) data: TeamDTO): Promise<ResponseObj> {
    return this.teamService.deletedTeam(data);
  }
}