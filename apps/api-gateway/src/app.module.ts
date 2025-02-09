import { Module } from '@nestjs/common';
import { AuthController } from './modules/controllers/auth.controller';
import { AuthService } from './modules/services/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './modules/services/user.service';
import { UserController } from './modules/controllers/user.controller';
import { VacancyController } from './modules/controllers/vacancy.controller';
import { VacancyService } from './modules/services/vacancy.service';
import { AuthGuard } from './modules/guards/auth.guard';
import { Reflector } from '@nestjs/core';
import { ApplicationsController } from './modules/controllers/applications.controller';
import { ApplicationsService } from './modules/services/applications.service';
import { CandidatesController } from './modules/controllers/candidates.controller';
import { CandidatesService } from './modules/services/candidates.service';
import { InterviewsController } from './modules/controllers/interviews.controller';
import { InterviewsService } from './modules/services/interviews.service';
import { CertificationsController } from './modules/controllers/certifications.controller';
import { CertificationsService } from './modules/services/certifications.service';
import { ZoomGatewayController } from './modules/controllers/zoom.controller';
import { ZoomGatewayService } from './modules/services/zoom.service';

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
      {
        name: 'VACANCY_MANAGEMENT_SERVICE', 
        transport: Transport.TCP,
        options: { 
           port: 3003 },
      },
      {
        name: 'CANDIDATE_SCREENING_SERVICE', 
        transport: Transport.TCP,
        options: { 
           port: 3004 },
      },
    ]),
  ],

  controllers: [AuthController, UserController, VacancyController, ApplicationsController,CandidatesController,InterviewsController,CertificationsController,ZoomGatewayController],
  providers: [AuthService, UserService, VacancyService, AuthGuard, Reflector, ApplicationsService,CandidatesService,InterviewsService,CertificationsService,ZoomGatewayService],
})
export class AppModule {}
