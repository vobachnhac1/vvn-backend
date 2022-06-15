import { IsDate, IsString } from 'class-validator';

export class AuthUserDTO {

    @IsString()
    ID:number;
  
    @IsString()
    ACCOUNTID:string; 
    
    @IsString()
    PASSWORD:string; 
    
    @IsString()
    INFO_CODE:string;

    @IsString()
    IS_SHOW:string;
    
    @IsDate()
    CREATED_DATE:Date;

    @IsString()
    CREATED_BY:string; 
    
    @IsString()
    BOMON_CODE:string;
}
