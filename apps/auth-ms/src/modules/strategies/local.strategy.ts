import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AppService } from '../../app.service';
import { SignInDto } from '../dtos/signin.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private appService: AppService) {
    super();
  }

  async validate(signInDto: SignInDto) {
    const user = await this.appService.validateUser(signInDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
