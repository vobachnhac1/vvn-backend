import { ApiProperty } from '@nestjs/swagger';

export class TaskInfoDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã Quy trình áp dụng task', default: '' })
  procedure_id: number;

  @ApiProperty({ description: 'Mã task', default: '' })
  task_id: number;

  @ApiProperty({ description: 'Tiêu đề task', default: '' })
  task_title: string;

  @ApiProperty({ description: 'nội dung task', default: '' })
  task_content: string;

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

  @ApiProperty({ description: 'Độ ưu tiên ', default: '' })
  priority: string;

  @ApiProperty({ description: 'Ngày bắt đầu', default: '' })
  start_date: Date;

  @ApiProperty({ description: 'Ngày kết thúc', default: '' })
  end_date: Date;

  @ApiProperty({ description: 'Chủ đề/ dự án', default: '' })
  topic_id: string;

  @ApiProperty({ description: 'Bước hiện tại', default: '' })
  current_position: number;

  listTaskProcess: TaskProcessDTO[];
}

export class TaskProcessDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã proccess task', default: '' })
  task_process_id: number;

  @ApiProperty({ description: 'Mã Quy trình', default: '' })
  task_id: number;

  @ApiProperty({ description: 'Mã task', default: '' })
  procedure_code: number;

  @ApiProperty({ description: 'Mã bước hiện tại', default: '' })
  step_code: string;

  @ApiProperty({ description: 'Người thực hiện', default: '' })
  user_hold: string;

  @ApiProperty({ description: 'nội dung submit', default: '' })
  content_submit: string;

  @ApiProperty({ description: 'Mã quy trình', default: '' })
  procedure_id: number;

  @ApiProperty({ description: 'Ngày bắt đầu dự kiến', default: '' })
  start_date: Date;

  @ApiProperty({ description: 'Ngày kết thúc dự kiến', default: '' })
  end_date: Date;

  @ApiProperty({ description: 'Ngày kết thúc thực tế', default: '' })
  finished_date: Date;

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

  @ApiProperty({ description: 'Vị trí', default: '' })
  position: number;
}

export class TaskFileDTO {
  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'Mã task', default: '' })
  task_id: number;

  @ApiProperty({ description: 'tên file', default: '' })
  file_name: string;

  @ApiProperty({ description: 'định dạng file', default: '' })
  type: string;

  @ApiProperty({ description: 'dài hình ảnh', default: '' })
  width: number;

  @ApiProperty({ description: 'cao hình ảnh', default: '' })
  height: number;

  @ApiProperty({ description: 'thuộc bước upload', default: '' })
  step: string;

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

export class TaskDTO {
  @ApiProperty({ description: 'Thông tin task', default: TaskInfoDTO })
  task_info: TaskInfoDTO;

  @ApiProperty({ description: 'Thông tin quá trình', default: TaskProcessDTO })
  task_process: TaskProcessDTO[];

  @ApiProperty({ description: 'Thông tin file đính kèm', default: TaskFileDTO })
  task_file: TaskFileDTO;
}
