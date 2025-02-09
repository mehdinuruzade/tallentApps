import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { CandidatesService } from '../services/candidates.service';
import { CreateCandidateDto } from '../dtos/createCandidate.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('candidates')
@UseGuards(AuthGuard)
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @Roles(1)
  async createCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.createCandidate(createCandidateDto);
  }
  @Get()
  @Roles(1)
  async getAllCandidates() {
    return this.candidatesService.getAllCandidates();
  }

  // GET /candidates/:id
  @Get(':id')
  @Roles(1)
  async getCandidateById(@Param('id') id: number) {
    return this.candidatesService.getCandidateById(id);
  }
}
