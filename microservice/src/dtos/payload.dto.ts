import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  id: string;
}
