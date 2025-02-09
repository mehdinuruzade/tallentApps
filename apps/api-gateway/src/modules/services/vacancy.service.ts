import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateVacancyDto } from '../dtos/createVacancy.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateVacancyDto } from '../dtos/updateVacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @Inject('VACANCY_MANAGEMENT_SERVICE') // Vacancy Management MS-ə TCP bağlantısı
    private readonly vacancyClient: ClientProxy,
  ) {}

  // Vakansiyanın yaradılması
  async createVacancy(createVacancyDto: CreateVacancyDto) {
    try {

      // Vacancy Management MS-ə müraciət (TCP)
      const result = await firstValueFrom(
        this.vacancyClient.send({ cmd: 'create-vacancy' }, createVacancyDto),
      );
      return result;
    } catch (error) {
      throw new RpcException(
        error.response?.message || 'An error occurred while creating the vacancy',
      );
    }
  }
  async updateVacancy(id: number, updateVacancyDto: UpdateVacancyDto) {
    const payload = { id, ...updateVacancyDto };
    return await firstValueFrom(
      this.vacancyClient.send({cmd:'update_vacancy'}, payload),
    );
  }
  async getVacancies() {
    return await firstValueFrom(
      this.vacancyClient.send({cmd:'get_vacancies'}, {}),
    );
  }
  async deleteVacancy(id: number) {
    console.log("delete start")
    return await firstValueFrom(
      this.vacancyClient.send({ cmd: 'delete-vacancy' }, { id }),
      { defaultValue: { success: "okay", message: 'Successfully deleted' } },
    );
}
}
