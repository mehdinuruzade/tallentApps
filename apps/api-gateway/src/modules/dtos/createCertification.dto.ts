import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateCertificationDto {
  @IsInt()
  candidateId: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
