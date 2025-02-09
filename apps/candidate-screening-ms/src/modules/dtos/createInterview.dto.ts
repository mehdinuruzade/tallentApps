import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateInterviewDto {
  @IsInt()
  @IsNotEmpty()
  candidateId: number;

  @IsDate()
  @Type(() => Date) // Tarixi avtomatik olaraq Date obyektinə çevirir
  @IsNotEmpty()
  scheduleTime: Date;

  @IsOptional()
  @IsString()
  recordingUrl?: string;

  @IsOptional()
  @IsString()
  feedback?: string;
}
