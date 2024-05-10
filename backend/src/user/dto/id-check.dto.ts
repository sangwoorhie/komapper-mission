import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdcheckDto {
  @IsString()
  @ApiProperty({ description: '유저 아이디 목록' })
  id: string;
}
