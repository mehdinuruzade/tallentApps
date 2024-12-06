import { Controller, Logger, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { UpdateUserProfileDto } from './modules/dtos/updateUserProfile.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create-user-profile' })
  async createUserProfile(id: UUID)
 {
    return this.appService.createUser(id);
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
  async updateUser(data: any) {

    return this.appService.updateUser(data);
  }
  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser() {
    return this.appService.deleteUser();
  }
}
