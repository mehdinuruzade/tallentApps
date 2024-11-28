import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AppService } from '../../app.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData(); // Payload from the request

    // Check if email and password are present
    if (!data || !data.email || !data.password) {
      throw new RpcException(
        new UnauthorizedException('Email and Password Required!'),
      );
    }

    // Validate user credentials
    const user = await this.appService.validateUser(data);
    if (!user) {
      throw new RpcException(
        new UnauthorizedException('User Credentials are Invalid'),
      );
    }

    // Attach the user to the context for downstream use
    rpcContext.getContext().user = user;

    return true;
  }
}
