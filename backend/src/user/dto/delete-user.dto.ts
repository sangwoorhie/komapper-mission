import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class DeleteUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
