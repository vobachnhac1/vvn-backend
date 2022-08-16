import { ApiProperty } from '@nestjs/swagger';

export class StepProcessDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã', default: '' })
  step_code: string;

  @ApiProperty({ description: 'Tên bước hiện tại', default: '' })
  step_name: string;

  @ApiProperty({ description: 'Ngày tạo', default: '' })
  created_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  created_by: string;

  @ApiProperty({ description: 'Ngày cập nhật', default: '' })
  updated_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  updated_by: string;

  @ApiProperty({ description: 'trạng thái', default: '' })
  status: string;
}
