import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createuser(): string {
    return 'User created';
  }
}
