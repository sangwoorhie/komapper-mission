import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '아이디' })
  id: string;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsString()
  @ApiProperty({ description: '전화번호' })
  phone: number;

  @IsString()
  @ApiProperty({ description: '소속' })
  organization: string;
}
