import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidates } from './modules/entities/candidates.entity';
import { CreateCandidateDto } from './modules/dtos/createCandidate.dto';
import { CreateInterviewDto } from './modules/dtos/createInterview.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidates)
    private readonly candidateRepository: Repository<Candidates>,
  ) {}


  async createCandidate(createCandidateDto: CreateCandidateDto): Promise<Candidates> {
    const candidate = this.candidateRepository.create(createCandidateDto);
    return this.candidateRepository.save(candidate);
  }
  async getAllCandidates(): Promise<Candidates[]> {
    return this.candidateRepository.find();
  }

  async getCandidateById(id: number): Promise<Candidates> {
    const candidate = await this.candidateRepository.findOne({ where: { id } });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
    return candidate;
  }

}
