import { Test, TestingModule } from '@nestjs/testing';
import { VacancyController } from './app.controller';
import { VacancyService } from './app.service';

describe('VacancyController', () => {
  let vacancyController: VacancyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VacancyController],
      providers: [VacancyService],
    }).compile();

    vacancyController = app.get<VacancyController>(VacancyController);
  });

  // Update test cases as needed for vacancy functionality
});
