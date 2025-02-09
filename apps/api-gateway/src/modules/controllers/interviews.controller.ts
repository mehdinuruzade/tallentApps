import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateInterviewDto } from '../dtos/createInterview.dto';
import { InterviewsService } from '../services/interviews.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('interviews')
@UseGuards(AuthGuard)
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  @Roles(1)
  async createInterview(@Body() createInterviewDto: CreateInterviewDto) {
    return this.interviewsService.createInterview(createInterviewDto);
  }

  @Get(':candidateId')
  @Roles(1)
  async getInterviews(@Param('candidateId') candidateId: number) {
    return this.interviewsService.getInterviews(candidateId);
  }
}
