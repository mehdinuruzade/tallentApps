import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsNumber()
  candidateId: number;
  @IsNotEmpty()
  @IsString()
  status: 'pending' | 'accepted' | 'rejected';
}
