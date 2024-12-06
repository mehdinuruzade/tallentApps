import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { UpdateUserProfileDto } from '../dtos/updateUserProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}
  async createUserProfile(id: UUID) {
    return await this.userService.send({ cmd: 'create-user-profile' }, id).toPromise();
  }
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
  // User update API
  async updateUserProfile(userProfileData: UpdateUserProfileDto, token: string) {
    const user = await this.authService.send({ cmd: 'validate-token' }, token).toPromise();
    if (!user) {
      throw new RpcException('Unauthorized: Invalid or expired token');
      
    }
    return this.userService.send({ cmd: 'update-user' }, { userId: user.id, userProfileData }).toPromise();
  }
}
