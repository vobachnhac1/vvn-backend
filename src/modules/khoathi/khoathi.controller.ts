import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseObj } from "src/shared";
import { KhoathiDTO } from "./dto";
import { KhoathiService } from "./khoathi.service";

@ApiTags('Quản lý Khoá thi')
@Controller('khoathi')
export class KhoathiController {
  constructor(private KhoathiService: KhoathiService) { }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'lấy danh sách Khoá thi'
  })
  async searchKhoathi(@Body(ValidationPipe) data: KhoathiDTO): Promise<ResponseObj> {
    return this.KhoathiService.searchKhoathi(data);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Thêm mới Khoá thi'
  })
  async insertKhoathi(@Body(ValidationPipe) data: KhoathiDTO): Promise<ResponseObj> {
    return this.KhoathiService.insertKhoathi(data);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Cập nhật Khoá thi'
  })
  async updatedKhoathi(@Body(ValidationPipe) data: KhoathiDTO): Promise<ResponseObj> {
    return this.KhoathiService.updatedKhoathi(data);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Xóa Khoá thi'
  })
  async deletedKhoathi(@Body(ValidationPipe) data: KhoathiDTO): Promise<ResponseObj> {
    return this.KhoathiService.deletedKhoathi(data);
  }

  @Post('update-status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    // type: SwaggerSegmentResSimple, /// mô tả response trả về dạng object
    status: 200,
    description: 'Cập nhật trạng thái Khoá thi'
  })
  async updateStatusKhoathi(@Body(ValidationPipe) data: KhoathiDTO): Promise<ResponseObj> {
    return this.KhoathiService.updateStatusKhoathi(data);
  }
}