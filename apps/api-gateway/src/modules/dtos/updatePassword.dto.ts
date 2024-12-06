import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

// update-password.dto.ts
export class UpdatePasswordDto {
    @ApiProperty({ description: 'User\'s new password', example: 'newPassword123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
  }
