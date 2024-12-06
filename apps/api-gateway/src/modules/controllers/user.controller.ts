import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Headers,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UUID } from 'crypto';
import { Payload } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserProfileDto } from '../dtos/updateUserProfile.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    
    return this.userService.findUserById(id);
  }

  // @Put(':id')
  // async updateUser(@Param('id') id: string, @Body() dto: any) {
  //   return this.userService.updateUser(id, dto);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Post(':create-user-profile')
  async createUserProfile(@Query('id') id: UUID) {
    return await this.userService.createUserProfile(id);
  }
 @Put(':update-user-profile')
 @ApiOperation({ summary: 'Update user profile' })  
 @ApiResponse({ status: 200, description: 'User profile updated successfully.' })  
 @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })  
 async updateUserProfile(@Body() dto: UpdateUserProfileDto, @Headers('authorization') token: string) {
  return this.userService.updateUserProfile(dto, token);
 }

}
