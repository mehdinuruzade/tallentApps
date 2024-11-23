import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser() {
    return this.appService.createUser();
  }

  @MessagePattern({ cmd: 'find-all-users' })
  async findAllUsers() {
    return this.appService.findAllUsers();
  }

  @MessagePattern({ cmd: 'find-user' })
  async findUser() {
    return this.appService.findUser();
  }
  @MessagePattern({ cmd: 'update-user' })
  async updateUser() {
    return this.appService.updateUser();
  }
  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser() {
    return this.appService.deleteUser();
  }
}
