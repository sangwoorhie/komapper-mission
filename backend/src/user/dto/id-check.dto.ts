import { IsString } from 'class-validator';

export class IdcheckDto {
  @IsString()
  id: string;
}
