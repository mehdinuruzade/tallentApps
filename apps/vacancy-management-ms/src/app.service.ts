import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Vacancy } from './modules/entities/vacancies.entity';
import { CreateVacancyDto } from './modules/dtos/createVacancy.dto';
import { UpdateVacancyDto } from './modules/dtos/updateVacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
  ) {}

  async createVacancy(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const vacancy = this.vacancyRepository.create(createVacancyDto);
    return this.vacancyRepository.save(vacancy);
  }

  async updateVacancy(id: number, updateVacancyDto: UpdateVacancyDto): Promise<Vacancy> {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id },
    });
    if (!vacancy) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
    Object.assign(vacancy, updateVacancyDto);
    return this.vacancyRepository.save(vacancy);
  }

  async findAllVacancies(): Promise<Vacancy[]> {
    return this.vacancyRepository.find();
  }

  async removeVacancies(id: number): Promise<void> {
    const result = await this.vacancyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
  }

}
