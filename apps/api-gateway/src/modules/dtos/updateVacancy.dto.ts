import { IsOptional, IsString, IsJSON, IsEnum, IsInt } from 'class-validator';

export class UpdateVacancyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsJSON()
  requirements?: any;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  salaryRange?: string;

  @IsOptional()
  @IsEnum(['active', 'closed', 'archived'])
  status?: 'active' | 'closed' | 'archived';

  @IsOptional()
  @IsInt()
  createdBy?: number;
}
