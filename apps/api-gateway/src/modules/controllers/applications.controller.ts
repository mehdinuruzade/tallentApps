import { Controller, Post, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { CreateApplicationDto } from '../dtos/createApplication.dto';
import { UpdateApplicationStatusDto } from '../dtos/updateApplicationStatus.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApplicationsService } from '../services/applications.service';

@Controller('vacancies/:vacancyId/applications')
@UseGuards(AuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  async createApplication(
    @Param('vacancyId') vacancyId: string,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationsService.createApplication(vacancyId, createApplicationDto);
  }

  @Get()
  async getApplications(@Param('vacancyId') vacancyId: string) {
    return this.applicationsService.getApplications(vacancyId);
  }

  @Put(':applicationId')
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
  ) {
    return this.applicationsService.updateApplicationStatus(applicationId, updateApplicationStatusDto);
  }
}
