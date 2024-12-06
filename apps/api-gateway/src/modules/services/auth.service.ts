import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SignInDto } from '../dtos/signin.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}
  async register(credentials: { email: string; password: string }) {
    return this.authService.send({ cmd: 'create_user' }, credentials);
  }

  async signIn(dto: SignInDto) {
    return await firstValueFrom(
      this.authService
        .send({ cmd: 'signin' }, dto)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }
  async validateToken(token: string) {
    return this.authService.send({ cmd: 'validate-token' }, token);
  } 
  
}
