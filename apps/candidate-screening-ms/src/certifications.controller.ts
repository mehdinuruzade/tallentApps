import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCertificationDto } from './modules/dtos/createCertification.dto';
import { CertificationsService } from './certifications.service';

@Controller()
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @MessagePattern({ cmd: 'create-certification' })
  async createCertification(createCertificationDto: CreateCertificationDto) {
    return this.certificationsService.createCertification(createCertificationDto);
  }

  @MessagePattern({ cmd: 'get-certifications' })
  async getCertifications(data: { candidateId: number }) {
    return this.certificationsService.getCertifications(data.candidateId);
  }
}
