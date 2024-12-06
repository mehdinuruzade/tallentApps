import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { UserProfile } from './modules/entities/user.profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserProfileDto } from './modules/dtos/updateUserProfile.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfile: Repository<UserProfile>,
    
) {}
 
  async createUser(id: UUID): Promise<boolean> {
    const userProfile = this.userProfile.create({
      userAuthID: id,
    });

      try {
        await this.userProfile.save(userProfile);
        return true;  // Data is saved successfully
      } catch (error) {
        console.error('Error saving user profile:', error);
        return false;  // Return false if save fails
      }
    }
  async updateUser(userProfileData: any): Promise<UserProfile> {
    const existingUserProfile = await this.userProfile.findOne({ where: { userAuthID: userProfileData.userId } });
    if (!existingUserProfile) {
      throw new RpcException('User profile not found');
    }

    existingUserProfile.name = userProfileData.name || existingUserProfile.name;
    existingUserProfile.surname = userProfileData.surname || existingUserProfile.surname;
    existingUserProfile.patronymic = userProfileData.patronymic || existingUserProfile.patronymic;
    existingUserProfile.gender = userProfileData.gender || existingUserProfile.gender;
    existingUserProfile.position = userProfileData.position || existingUserProfile.position;
    existingUserProfile.positionLevel = userProfileData.positionLevel || existingUserProfile.positionLevel;
    existingUserProfile.positionSublevel = userProfileData.positionSublevel || existingUserProfile.positionSublevel;
    try {

      await this.userProfile.save(existingUserProfile);
      return existingUserProfile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new RpcException('Error updating user profile');
    }
  }

  findAllUsers(): string {
    return 'List of Users';
  }

  findUser(): string {
    return 'User found';
  }

  deleteUser(): string {
    return 'User deleted';
  }
}
