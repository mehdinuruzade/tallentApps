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
  async updateUser(data: any): Promise<UserProfile> {
    const existingUserProfile = await this.userProfile.findOne({ where: { userAuthID: data.userId } });

    if (!existingUserProfile) {
      throw new RpcException('User profile not found');
    }

    // Log the data to check if everything is correct
    console.log('User profile data to be updated:', data);
    console.log('Existing user profile:', existingUserProfile);

    // Update the fields with the new values from userProfileData
    existingUserProfile.name = data.userProfileData.name || existingUserProfile.name;
    existingUserProfile.surname = data.userProfileData.surname || existingUserProfile.surname;
    existingUserProfile.patronymic = data.userProfileData.patronymic || existingUserProfile.patronymic;
    existingUserProfile.gender = data.userProfileData.gender || existingUserProfile.gender;
    existingUserProfile.position = data.userProfileData.position || existingUserProfile.position;
    existingUserProfile.positionLevel = data.userProfileData.positionLevel || existingUserProfile.positionLevel;
    existingUserProfile.positionSublevel = data.userProfileData.positionSublevel || existingUserProfile.positionSublevel;
    

    // Log updated fields to verify if update is happening correctly
    console.log('Updated user profile:', existingUserProfile);

    try {
      // Save the updated profile
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
