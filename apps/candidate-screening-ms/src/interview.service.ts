import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interviews } from './modules/entities/interviews.entity';
import { CreateInterviewDto } from './modules/dtos/createInterview.dto';
import { CandidateService } from './app.service';


@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(Interviews)
    private readonly interviewRepository: Repository<Interviews>,
    private readonly candidateService: CandidateService
  ) {}

  async createInterview(createInterviewDto: CreateInterviewDto): Promise<Interviews> {
    console.log('interview', createInterviewDto);

    // `candidateId`-yə əsasən əlaqəli obyekt tapılır
    const candidate = await this.candidateService.getCandidateById(createInterviewDto.candidateId);
  
    if (!candidate) {
      throw new Error(`Candidate with ID ${createInterviewDto.candidateId} not found`);
    }
  
    // `candidate` obyektini certification-a təyin et
    const interview = this.interviewRepository.create({
      ...createInterviewDto,
      candidate, // Əlaqəli obyekt olaraq təyin edilir
    });
    return this.interviewRepository.save(interview);

  }

  async getInterviews(candidateId: number): Promise<Interviews[]> {
    return this.interviewRepository.find({
      where: { candidate: { id: candidateId } }, // Use the nested property for the relation
      relations: ['candidate'], // Include the relation if needed
    });
}
}
