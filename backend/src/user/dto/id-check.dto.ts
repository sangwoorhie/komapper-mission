import { IsNotEmpty, IsString } from 'class-validator';

export class IdcheckDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
