import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './app.controller';
import { VideoService } from './app.service';

describe('VideoController', () => {
  let vacancyController: VideoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoService],
    }).compile();

    vacancyController = app.get<VideoController>(VideoController);
  });

  // Update test cases as needed for vacancy functionality
});
