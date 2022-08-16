import { ApiProperty } from '@nestjs/swagger';

export class PriorityDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'ID', default: 0 })
  id: number;

  @ApiProperty({ description: 'Mã', default: '' })
  priority_code: string;

  @ApiProperty({ description: 'Tên hiển thị', default: '' })
  priority_name: string;

  @ApiProperty({ description: 'trạng thái', default: '' })
  status: string;

  @ApiProperty({ description: 'Ngày tạo', default: '' })
  created_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  created_by: string;

  @ApiProperty({ description: 'Ngày cập nhật', default: '' })
  updated_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  updated_by: string;
}
