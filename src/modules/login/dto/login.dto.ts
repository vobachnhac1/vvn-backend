import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class LoginDTO {

  @ApiProperty({ description: 'stt', default: 0 })
  ord_numbers: number;

  @ApiProperty({ description: 'id', default: "" })
  id: string;

  @ApiProperty({ description: 'Tên tài khoản', default: "" })
  username: string;

  @ApiProperty({ description: 'Mật khẩu', default: "" })
  password: string;

  @ApiProperty({ description: 'Họ tên đầy đủ', default: "" })
  fullname: string;

  @ApiProperty({ description: 'link hình ảnh', default: "" })
  avatar_url: Date; 
  
  @ApiProperty({ description: 'Quyền', default: "" })
  roles: string;

  @ApiProperty({ description: 'Chức vụ', default: "" })
  position: string;

  @ApiProperty({ description: 'Số điện thoại', default: "" })
  phone:     string;  
  
  @ApiProperty({ description: 'Thư điện tử', default: "" })
  email:     string; 

  @ApiProperty({ description: 'Ngày tạo', default: "" })
  created_date: Date;  

  @ApiProperty({ description: 'Ngày cập nhật', default: "" })
  updated_date: Date; 
  
  @ApiProperty({ description: 'Thiết bị đang dùng', default: "" })
  devices_info: string;
  
  @ApiProperty({ description: 'hash  token', default: "" })
  hash: string;  
  
  @ApiProperty({ description: 'hash refresh token', default: "" })
  hashRF: string;

  @ApiProperty({ description: 'Ngày cập nhật token', default: "" })
  updated_token: Date;

  @ApiProperty({ description: 'Ngày tạo token', default: "" })
  created_token: Date;

  @ApiProperty({ description: 'Hiệu lực token', default: "" })
  expired_token: Date;


}

export class TokenGenerationReq {
  @IsNotEmpty()
  @ApiProperty()

  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}


export class ResponsePayLoad {
  @ApiProperty()
  username: string;

  @ApiProperty({ description: 'Họ tên đầy đủ', default: "" })
  fullname: string;

  @ApiProperty({ description: 'link hình ảnh', default: "" })
  avatar_url: Date; 
  
  @ApiProperty({ description: 'Quyền', default: "" })
  roles: string;

  @ApiProperty({ description: 'Ngày tạo', default: "" })
  created_date: Date;  

  @ApiProperty({ description: 'Ngày cập nhật', default: "" })
  updated_date: Date; 
  
  @ApiProperty({ description: 'Thiết bị đang dùng', default: "" })
  devices_info: string;
  
  @ApiProperty({ description: 'Chức vụ', default: "" })
  position:     string;  
  
  @ApiProperty({ description: 'Số điện thoại', default: "" })
  phone:     string;  

  @ApiProperty({ description: 'Thư điện tử', default: "" })
  email:     string; 
  
  @ApiProperty({ description: 'access_token', default: "" })
  access_token:     string; 
  
  @ApiProperty({ description: 'refresh_token', default: "" })
  refresh_token:     string;

}