import { Controller, UseGuards, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './modules/dtos/createuser.dto';
import { LocalAuthGuard } from './modules/guards/local-auth.guard';
import { SignInDto } from './modules/dtos/signin.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @MessagePattern({ cmd: 'signin' })
  async signIn(
    @Payload(new ValidationPipe({ transform: true })) user: SignInDto,
  ) {
    return this.appService.signIn(user);
  }
  @MessagePattern({ cmd: 'validate-token' })
  async validateToken(@Payload() token: string) {
    return this.appService.validateToken(token);
  }
  
}
