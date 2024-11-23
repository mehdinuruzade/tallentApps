import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AppService {
  async login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    // Simulate user validation (replace with real logic)
    if (email === 'test@example.com' && password === 'securepassword') {
      return { token: 'jwt-token-example' }; // Simulated JWT
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
