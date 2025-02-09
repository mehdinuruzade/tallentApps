import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateVacancyDto } from './modules/dtos/createVacancy.dto';
import { VacancyService } from './app.service';
import { UpdateVacancyDto } from './modules/dtos/updateVacancy.dto';

@Controller()
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @MessagePattern({ cmd: 'create-vacancy' })
  async createVacancy(data: CreateVacancyDto) {
    return this.vacancyService.createVacancy(data);
  }

  @MessagePattern({cmd:'update_vacancy'})
  async updateVacancy(data: { id: number; updateVacancyDto: UpdateVacancyDto }) {
    const { id, updateVacancyDto } = data;
    return this.vacancyService.updateVacancy(id, updateVacancyDto);
  }
  @MessagePattern('get_vacancies')
  async getVacancies() {
    return this.vacancyService.findAllVacancies();
  }
  @MessagePattern({cmd:'delete-vacancy'})
  async deleteVacancy(data: { id: number }) {
    const { id } = data;
    return this.vacancyService.removeVacancies(id);
  }


}






