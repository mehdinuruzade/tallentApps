import { Controller, Post, Body } from '@nestjs/common';
import { CreateMeetingDto } from './modules/dtos/createMeeting.dto';
import { ZoomService } from './zoom.integration.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @MessagePattern({cmd:'create-meeting'})
  async createMeeting( createMeetingDto: CreateMeetingDto) {
    const { candidateName, scheduleTime } = createMeetingDto;
    return this.zoomService.createMeeting(candidateName, new Date(scheduleTime));
  }

}