import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}
  async login(credentials: { email: string; password: string }) {
    return this.authService.send({ cmd: 'login' }, credentials).toPromise();
  }
}
