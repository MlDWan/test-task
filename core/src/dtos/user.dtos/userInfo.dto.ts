import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserInfoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
  surname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
