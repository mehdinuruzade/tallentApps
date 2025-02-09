import { IsString, IsDateString } from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  candidateName: string;

  @IsDateString()
  scheduleTime: string; // ISO formatında tarix (məsələn, 2025-01-20T10:00:00Z)
}