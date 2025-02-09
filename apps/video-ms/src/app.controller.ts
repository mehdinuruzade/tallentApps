import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { VideoService } from './app.service';

@Controller()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // @MessagePattern({ cmd: 'create-vacancy' })
  // async createVacancy(data: CreateVacancyDto) {
  //   return this.videoService.createVacancy(data);
  // }
}
