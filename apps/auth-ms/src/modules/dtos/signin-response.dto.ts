import { Expose, Type } from 'class-transformer';

class RefreshTokenDto {
  @Expose()
  id: number;

  @Expose()
  token: string;

  @Expose()
  expiresAt: Date;
}

export class SignInResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  @Expose()
  accessToken: string;

  @Expose()
  @Type(() => RefreshTokenDto) // Transform nested objects
  refreshTokens: RefreshTokenDto[];
}
