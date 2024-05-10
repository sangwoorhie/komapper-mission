import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ description: '유저 아이디 목록' })
  ids: string[];
}
