import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SignInDto } from '../dtos/signin.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { UpdatePasswordDto } from '../dtos/updatePassword.dto';

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

  // Update password method in API Gateway
  async updatePassword(token: string, updatePasswordDto: UpdatePasswordDto) {
    try {
      const user = await this.authService.send({ cmd: 'validate-token' }, token).toPromise();
      
      if (!user) {
        throw new RpcException('Unauthorized: Invalid or expired token');
      }
      return await this.authService.send({ cmd: 'update-password' }, {
        userId: user.id,
        newPassword: updatePasswordDto.newPassword,
      }).toPromise();
    } catch (error) {
      throw new RpcException('Error resetting password: ' + error.message);
    }
  }
  async sendPasswordResetEmail(email: string): Promise<any> {
    try {
      console.log({"email from contoller : ": email})
      // Auth microservice'e müraciət edirik
      const result = await
        this.authService.send({ cmd: 'forgot-password' },  email ).toPromise();
      
      return result;
    } catch (error) {
      throw new Error('Error sending password reset email');
    }

  
  }
}
