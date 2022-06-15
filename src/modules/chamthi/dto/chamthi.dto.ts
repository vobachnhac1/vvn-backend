import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChamThiDTO {

  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã khóa thi', default: "" })
  khoathi_code: string; 
  
  @ApiProperty({ description: 'Họ tên', default: "" })
  fullname: string;  
  
  @ApiProperty({ description: 'Mã thi', default: "" })
  mathi: string;

  @ApiProperty({ description: 'Đẳng cấp', default: "" })
  level_name: string;  
  
  @ApiProperty({ description: 'Mã Đẳng cấp', default: "" })
  level_code: string;  

  @ApiProperty({ description: 'Giới tính', default: "" })
  gender: string;
  
  @ApiProperty({ description: 'Đơn vị', default: "" })
  team: string;

  @ApiProperty({ description: 'Năm sinh', default: "" })
  dob: string;

  @ApiProperty({ description: 'Điểm căn bản', default: "" })
  diem_cb: number;

  @ApiProperty({ description: 'Điểm đối kháng', default: "" })
  diem_dk: number;

  @ApiProperty({ description: 'Điểm thể lực', default: "" })
  diem_tl: number;

  @ApiProperty({ description: 'Điểm song luyện', default: "" })
  diem_sl: number;

  @ApiProperty({ description: 'Điểm đơn luyện', default: "" })
  diem_dl: number;

  @ApiProperty({ description: 'Điểm lý thuyết', default: "" })
  diem_lt: number;  
  
  @ApiProperty({ description: 'Điểm Tổng', default: "" })
  diem_tong: number;

  @ApiProperty({ description: 'Hạng', default: "" })
  xephang: string;

  @ApiProperty({ description: 'Ngày tạo', default: "" })
  created_date: Date; 
  
  @ApiProperty({ description: 'Người tạo', default: "" })
  created_by: string;

  @ApiProperty({ description: 'Ngày cập nhật', default: "" })
  modified_date: Date; 
  
  @ApiProperty({ description: 'Người tạo', default: "" })
  modified_by: string;

}

export class UploadFile {
  
  @ApiProperty({ description: 'user_id', default: 0 })
  user_id: string;

  @ApiProperty({ description: 'danh sách', default: 0 })
  data: ChamThiDTO[];

  @ApiProperty({ description: 'Mã khóa thi', default: 0 })
  khoathi_code: string;
}