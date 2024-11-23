import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.appService.login(credentials);
  }
}
