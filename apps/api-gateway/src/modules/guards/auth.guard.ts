import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,

  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Authorization header is missing');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token is missing');

    const user = await firstValueFrom(
      this.authClient.send({ cmd: 'validate-token' }, token),
    );
    console.log("role",user)
    if (!roles.includes(user.roleId)) throw new ForbiddenException('Access denied');

    request.user = user;
    return true;
  }
}
