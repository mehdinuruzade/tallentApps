import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInterviewDto } from '../dtos/createInterview.dto';

@Injectable()
export class InterviewsService {
  constructor(
    @Inject('CANDIDATE_SCREENING_SERVICE') private readonly interviewClient: ClientProxy,
  ) {}

  async createInterview(createInterviewDto: CreateInterviewDto) {
    const pattern = { cmd: 'create-interview' };
    return this.interviewClient.send(pattern, createInterviewDto).toPromise();
  }

  async getInterviews(candidateId: number) {
    const pattern = { cmd: 'get-interviews' };
    return this.interviewClient.send(pattern, { candidateId }).toPromise();
  }
}
