import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseObj } from "src/shared";
import { ChamThiDTO, ScoreSpeed, UploadFile } from "./dto";
import { ChamThiService } from "./chamthi.service";

@ApiTags('Quản lý Danh sách chấm thi')
@Controller('chamthi')
export class ChamThiController {
  constructor(private chamthiService: ChamThiService) { }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách item chấm thi'
  })
  async searchChamThi(@Body(ValidationPipe) data: ChamThiDTO): Promise<ResponseObj> {
    return this.chamthiService.searchChamThi(data);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Thêm mới item chấm thi'
  })
  async insertChamthi(@Body(ValidationPipe) data: ChamThiDTO): Promise<ResponseObj> {
    return this.chamthiService.insertChamthi(data);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Cập nhật item chấm thi'
  })
  async updateChamthi(@Body(ValidationPipe) data: ChamThiDTO): Promise<ResponseObj> {
    return this.chamthiService.updateChamthi(data);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Xóa record chấm thi'
  })
  async deletedChamthi(@Body(ValidationPipe) data: ChamThiDTO): Promise<ResponseObj> {
    return this.chamthiService.deletedChamthi(data);
  }

  
  @Post('upload-file-by-sheet')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Upload danh sách thi theo sheet'
  })
  async uploadListChamThi(@Body(ValidationPipe) data: UploadFile): Promise<ResponseObj> {
    return this.chamthiService.uploadListChamThi(data);
  }

  @Post('set-point-with-khoathi')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Upload danh sách thi theo sheet'
  })
  async scoreSpeed(@Body(ValidationPipe) data: ScoreSpeed): Promise<ResponseObj> {
    return this.chamthiService.scoreSpeed(data);
  }
}