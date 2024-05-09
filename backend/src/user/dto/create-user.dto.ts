import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: number;

  @IsString()
  organization: string;
}
