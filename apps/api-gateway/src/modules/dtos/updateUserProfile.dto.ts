import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdateUserProfileDto {
@ApiProperty({ description: 'User\'s first name', example: 'John' })
  @IsString()
  @IsOptional()
  name?: string;  // User's first name

  @ApiProperty({ description: 'User\'s surname', example: 'Doe' })
  @IsString()
  @IsOptional()
  surname?: string;  // User's surname

  @ApiProperty({ description: 'User\'s patronymic (middle name)', example: 'Smith' })
  @IsString()
  @IsOptional()
  patronymic?: string;  // User's patronymic (middle name), optional

  @ApiProperty({ description: 'User\'s gender (e.g., "male", "female", "other")', example: 'male' })
  @IsString()
  @IsOptional()
  gender?: string;  // User's gender (e.g., "male", "female", "other"), optional

  @ApiProperty({ description: 'User\'s job position', example: 'Software Engineer' })
  @IsString()
  @IsOptional()
  position?: string;  // User's job position, optional

  @ApiProperty({ description: 'User\'s position level (e.g., "junior", "mid", "senior")', example: 'junior' })
  @IsString()
  @IsOptional()
  positionLevel?: string;  // User's position level (e.g., "junior", "mid", "senior"), optional

  @ApiProperty({ description: 'User\'s position sublevel (e.g., "lead", "assistant")', example: 'lead' })
  @IsString()
  @IsOptional()
  positionSublevel?: string;  // User's position sublevel (e.g., "lead", "assistant"), optional
}
