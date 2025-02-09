import { Controller, Post, Body, UseGuards, Param, Put, Get, Delete } from '@nestjs/common';
import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../dtos/createVacancy.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateVacancyDto } from '../dtos/updateVacancy.dto';

@ApiTags('vacancy')
@ApiBearerAuth()
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post('create-vacancy')
   @UseGuards(AuthGuard)
   @Roles(2,4)
  @ApiOperation({ summary: 'Create a new vacancy' })
  @ApiResponse({ status: 201, description: 'Vacancy created successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async createVacancy(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.createVacancy(createVacancyDto);
  }
  @Put('update-vacancy/:id')
  @UseGuards(AuthGuard)
  @Roles(2,4)
  @ApiOperation({ summary: 'Update an existing vacancy' })
  @ApiResponse({ status: 200, description: 'Vacancy updated successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async updateVacancy(

    @Param('id') id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    console.log("start update",updateVacancyDto,id)
    return this.vacancyService.updateVacancy(id, updateVacancyDto);
  }
  @Get('get-vacancies')
  @UseGuards(AuthGuard) // İstifadəçi autentifikasiyası üçün
  @ApiOperation({ summary: 'Get all vacancies' })
  @ApiResponse({ status: 200, description: 'List of vacancies retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getVacancies() {
    return this.vacancyService.getVacancies();
  }
  @Delete('delete-vacancy/:id')
  @UseGuards(AuthGuard)
  @Roles(2, 4)
  @ApiOperation({ summary: 'Delete a vacancy' })
  @ApiResponse({ status: 200, description: 'Vacancy deleted successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async deleteVacancy(@Param('id') id: number) {
    return this.vacancyService.deleteVacancy(id);
  }
}
