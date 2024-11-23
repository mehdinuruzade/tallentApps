import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  async createUser(dto: any) {
    return this.userService.send({ cmd: 'create-user' }, dto).toPromise();
  }

  async findAllUsers() {
    return this.userService.send({ cmd: 'find-all-users' }, {}).toPromise();
  }

  async findUserById(id: string) {
    return this.userService.send({ cmd: 'find-user' }, id).toPromise();
  }

  async updateUser(id: string, dto: any) {
    return this.userService
      .send({ cmd: 'update-user' }, { id, dto })
      .toPromise();
  }

  async deleteUser(id: string) {
    return this.userService.send({ cmd: 'delete-user' }, id).toPromise();
  }
}
