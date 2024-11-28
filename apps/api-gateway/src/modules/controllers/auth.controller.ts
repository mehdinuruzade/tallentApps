import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body() credentials: { email: string; password: string }) {
  //   return this.authService.login(credentials);
  // }

  @Post('register')
  async register(@Body() credentials: { email: string; password: string }) {
    return this.authService.register(credentials);
  }

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}
