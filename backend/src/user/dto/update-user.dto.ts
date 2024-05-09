import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  password: string;

  @IsString()
  newPassword: string;

  @IsString()
  name: string;

  @IsString()
  phone: number;

  @IsString()
  organization: string;
}
