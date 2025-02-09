import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateApplicationStatusDto } from '../dtos/updateApplicationStatus.dto';
import { CreateApplicationDto } from '../dtos/createApplication.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject('VACANCY_MANAGEMENT_SERVICE') private readonly vacancyClient: ClientProxy,
  ) {}

  async createApplication(vacancyId: string, createApplicationDto: CreateApplicationDto) {
    const pattern = { cmd: 'create-application' };
    const payload = { vacancyId, ...createApplicationDto };
    return this.vacancyClient.send(pattern, payload).toPromise();
  }

  async getApplications(vacancyId: string) {
    const pattern = { cmd: 'get-applications' };
    const payload = { vacancyId };
    return this.vacancyClient.send(pattern, payload).toPromise();
  }

  async updateApplicationStatus(applicationId: string, updateApplicationStatusDto: UpdateApplicationStatusDto) {
    const pattern = { cmd: 'update-application-status' };
    const payload = { applicationId, ...updateApplicationStatusDto };
    return this.vacancyClient.send(pattern, payload).toPromise();
  }
}
