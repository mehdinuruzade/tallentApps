import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async login(credentials: { email: string; password: string }) {
    return this.client.send({ cmd: 'login' }, credentials).toPromise();
  }
}
