import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCandidateDto } from '../dtos/createCandidate.dto';

@Injectable()
export class CandidatesService {
  constructor(
    @Inject('CANDIDATE_SCREENING_SERVICE') private readonly candidateClient: ClientProxy,
  ) {}

  async createCandidate(createCandidateDto: CreateCandidateDto) {
    const pattern = { cmd: 'create-candidate' };
    const payload = createCandidateDto;
    return this.candidateClient.send(pattern, payload).toPromise();
  }
  async getAllCandidates() {
    const pattern = { cmd: 'get-all-candidates' };
    return this.candidateClient.send(pattern, {}).toPromise();
  }

  async getCandidateById(id: number) {
    const pattern = { cmd: 'get-candidate-by-id' };
    return this.candidateClient.send(pattern, { id }).toPromise();
  }
}
