import { IsNotEmpty, IsOptional, IsString, IsEnum, IsObject, IsBoolean, IsEmail } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  selectedLevel: string;

  @IsBoolean()
  @IsOptional()
  profileCompleted?: boolean;
}
