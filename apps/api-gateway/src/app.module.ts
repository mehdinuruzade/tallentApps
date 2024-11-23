import { Module } from '@nestjs/common';
import { AuthController } from './modules/controllers/auth.controller';
import { AuthService } from './modules/services/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './modules/services/user.service';
import { UserController } from './modules/controllers/user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class AppModule {}
