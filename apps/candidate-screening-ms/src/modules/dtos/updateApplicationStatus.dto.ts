import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateApplicationStatusDto {
  @IsNotEmpty()
  @IsString()
  status: 'pending' | 'accepted' | 'rejected';
}
