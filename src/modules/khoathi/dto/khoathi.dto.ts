import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class KhoathiDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã khóa thi', default: '' })
  khoathi_code: string;

  @ApiProperty({ description: 'Tên khóa thi', default: '' })
  khoathi_name: string;

  @ApiProperty({ description: 'Địa chỉ tổ chức', default: '' })
  khoathi_address: string;

  @ApiProperty({ description: 'ghi chú', default: '' })
  khoathi_note: string;

  @ApiProperty({ description: 'trạng thái', default: '' })
  khoathi_status: string;

  @ApiProperty({ description: 'Hình thức', default: '' })
  khoathi_type: string;

  @ApiProperty({ description: 'Ngày tạo', default: '' })
  created_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  created_by: string;

  @ApiProperty({ description: 'Ngày cập nhật', default: '' })
  modified_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  modified_by: string;

  @ApiProperty({ description: 'Tài khoản', default: '' })
  username: string;
}
