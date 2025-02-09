import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCertificationDto } from '../dtos/createCertification.dto';

@Injectable()
export class CertificationsService {
  constructor(
    @Inject('CANDIDATE_SCREENING_SERVICE') private readonly certificationClient: ClientProxy,
  ) {}

  async createCertification(createCertificationDto: CreateCertificationDto) {
    const pattern = { cmd: 'create-certification' };
    return this.certificationClient.send(pattern, createCertificationDto).toPromise();
  }

  async getCertifications(candidateId: number) {
    const pattern = { cmd: 'get-certifications' };
    return this.certificationClient.send(pattern, { candidateId }).toPromise();
  }
}
