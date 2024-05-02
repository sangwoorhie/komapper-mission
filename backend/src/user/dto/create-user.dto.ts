import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, {
    message:
      '비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다.',
  })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  organization: string;
}
