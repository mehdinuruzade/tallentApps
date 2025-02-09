import { IsNotEmpty, IsOptional, IsString, IsEnum, IsObject } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsObject() // Validates requirements as JSON
  requirements: Record<string, any>;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  salaryRange: string;

  @IsEnum(['active', 'closed', 'archived'], {
    message: 'Status must be active, closed, or archived',
  })
  status: 'active' | 'closed' | 'archived';

  @IsNotEmpty()
  createdBy: number;
}
