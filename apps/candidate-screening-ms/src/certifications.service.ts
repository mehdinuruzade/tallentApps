import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certifications } from './modules/entities/certifications.entity';
import { CreateCertificationDto } from './modules/dtos/createCertification.dto';
import { CandidateService } from './app.service';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certifications)
    private readonly certificationRepository: Repository<Certifications>,
    private readonly candidateService: CandidateService
  ) {}

  async createCertification(createCertificationDto: CreateCertificationDto): Promise<Certifications> {
    console.log('candidate', createCertificationDto);

    // `candidateId`-yə əsasən əlaqəli obyekt tapılır
    const candidate = await this.candidateService.getCandidateById(createCertificationDto.candidateId);
  
    if (!candidate) {
      throw new Error(`Candidate with ID ${createCertificationDto.candidateId} not found`);
    }
  
    // `candidate` obyektini certification-a təyin et
    const certification = this.certificationRepository.create({
      ...createCertificationDto,
      candidate, // Əlaqəli obyekt olaraq təyin edilir
    });
  
    return this.certificationRepository.save(certification);
  }

  async getCertifications(candidateId: number): Promise<Certifications[]> {
    return this.certificationRepository.find({
      where: { candidate: { id: candidateId } }, // Use the nested property for the relation
      relations: ['candidate'], // Include the relation if needed
    });
  }
}
