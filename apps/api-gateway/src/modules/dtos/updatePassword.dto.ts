import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

// update-password.dto.ts
export class UpdatePasswordDto {
    @ApiProperty({ description: 'User\'s new password', example: 'newPassword123' })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, {
      message: 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.',
    })
    newPassword: string;
  }
