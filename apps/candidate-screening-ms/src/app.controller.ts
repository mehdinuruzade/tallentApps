import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateVacancyDto } from './modules/dtos/updateVacancy.dto';
import { CandidateService } from './app.service';
import { CreateCandidateDto } from './modules/dtos/createCandidate.dto';
import { CreateInterviewDto } from './modules/dtos/createInterview.dto';

@Controller()
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @MessagePattern({ cmd: 'create-candidate' })
  async createCandidate(createCandidateDto: CreateCandidateDto) {
    return this.candidateService.createCandidate(createCandidateDto);
  }

   // Get all candidates
   @MessagePattern({ cmd: 'get-all-candidates' })
   async getAllCandidates() {
     return this.candidateService.getAllCandidates();
   }
 
   // Get candidate by ID
   @MessagePattern({ cmd: 'get-candidate-by-id' })
   async getCandidateById(data: { id: number }) {
     return this.candidateService.getCandidateById(data.id);
   }
   
}
