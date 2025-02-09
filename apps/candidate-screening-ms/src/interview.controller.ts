import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCandidateDto } from './modules/dtos/createCandidate.dto';
import { CreateInterviewDto } from './modules/dtos/createInterview.dto';
import { InterviewsService } from './interview.service';

@Controller()
export class InterviewController {
  constructor(private readonly interviewService: InterviewsService) {}
  @MessagePattern({ cmd: 'create-interview' })
  async createInterview(createInterviewDto: CreateInterviewDto) {
    return this.interviewService.createInterview(createInterviewDto);
  }

  @MessagePattern({ cmd: 'get-interviews' })
  async getInterviews(data: { candidateId: number }) {
    return this.interviewService.getInterviews(data.candidateId);
  }

}






