import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
  surname: string;
}
