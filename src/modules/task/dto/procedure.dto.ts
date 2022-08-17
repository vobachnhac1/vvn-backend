import { ApiProperty } from '@nestjs/swagger';

export class ProcedureDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã', default: '' })
  procedure_id: number;

  @ApiProperty({ description: 'Tên', default: '' })
  procedure_name: string;

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

  @ApiProperty({ description: 'Danh sách Procedure detail', default: '' })
  listProcedureDt: ProcedureDetailDTO[];
}

export class ProcedureDetailDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã', default: '' })
  procedure_id: number;

  @ApiProperty({ description: 'Mã chi tiết', default: '' })
  procedure_detail_code: number;

  @ApiProperty({ description: 'Vị trí', default: '' })
  position: number;

  @ApiProperty({ description: 'Tên chi tiết', default: '' })
  procedure_detail_name: string;

  @ApiProperty({ description: 'Mã từng giai đoạn', default: '' })
  step_code: string;

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
