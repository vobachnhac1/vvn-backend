import { IsDate, IsString } from 'class-validator';

export class AuthJwtDTO {

    @IsString()
    user_id:string;
  
    @IsString()
    user_name:string; 
    
    @IsString()
    hash:string; 
    
    @IsString()
    hashRt:string;

    @IsDate()
    updated_date:Date;
    
    @IsDate()
    created_date:Date;

    @IsDate()
    expaird_date:Date;
}
