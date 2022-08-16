import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TeamDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã đơn vị', default: '' })
  team_code: string;

  @ApiProperty({ description: 'Tên đơn vị', default: '' })
  team_name: string;

  @ApiProperty({ description: 'Địa chỉ đơn vị', default: '' })
  team_address: string;

  @ApiProperty({ description: 'ghi chú', default: '' })
  team_note: string;

  @ApiProperty({ description: 'Ngày tạo', default: '' })
  created_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  created_by: string;

  @ApiProperty({ description: 'Ngày cập nhật', default: '' })
  modified_date: Date;

  @ApiProperty({ description: 'Người tạo', default: '' })
  modified_by: string;

  @ApiProperty({ description: 'tài khoản', default: '' })
  username: string;
}
