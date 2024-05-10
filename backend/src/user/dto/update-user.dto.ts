import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ description: '기존 비밀번호' })
  password: string;

  @IsString()
  @ApiProperty({ description: '새 비밀번호' })
  newPassword: string;

  @IsString()
  @ApiProperty({ description: '새 이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '새 전화번호' })
  phone: number;

  @IsString()
  @ApiProperty({ description: '새 소속' })
  organization: string;
}
