import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdateUserProfileDto {

  @IsString()
  @IsOptional()
  name?: string;  // User's first name

  @IsString()
  @IsOptional()
  surname?: string;  // User's surname

  @IsString()
  @IsOptional()
  patronymic?: string;  // User's patronymic (middle name), optional

  @IsString()
  @IsOptional()
  gender?: string;  // User's gender (e.g., "male", "female", "other"), optional

  @IsString()
  @IsOptional()
  position?: string;  // User's job position, optional

  @IsString()
  @IsOptional()
  positionLevel?: string;  // User's position level (e.g., "junior", "mid", "senior"), optional

  @IsString()
  @IsOptional()
  positionSublevel?: string;  // User's position sublevel (e.g., "lead", "assistant"), optional
}
