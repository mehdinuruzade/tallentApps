import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createUser(): string {
    return 'User created';
  }

  findAllUsers(): string {
    return 'List of Users';
  }

  findUser(): string {
    return 'User found';
  }

  updateUser(): string {
    return 'User updated';
  }

  deleteUser(): string {
    return 'User deleted';
  }
}
