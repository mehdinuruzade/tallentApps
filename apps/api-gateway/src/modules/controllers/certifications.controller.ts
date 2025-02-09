import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateCertificationDto } from '../dtos/createCertification.dto';
import { CertificationsService } from '../services/certifications.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('certifications')
@UseGuards(AuthGuard)
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post()
  @Roles(1)
  async createCertification(@Body() createCertificationDto: CreateCertificationDto) {
    return this.certificationsService.createCertification(createCertificationDto);
  }

  @Get(':candidateId')
  @Roles(1)
  async getCertifications(@Param('candidateId') candidateId: number) {
    return this.certificationsService.getCertifications(candidateId);
  }
}
