import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateMeetingDto } from '../dtos/createMeeting.dto';
import { ZoomGatewayService } from '../services/zoom.service';
import { log } from 'console';

@Controller('zoom')
export class ZoomGatewayController {
 constructor(private readonly zoomGatewayService: ZoomGatewayService) {}

  @Post('create-meeting')

  async createMeeting(@Body() createMeetingDto: CreateMeetingDto) {
    console.log("bodyyyy",createMeetingDto)
  return this.zoomGatewayService.createMeeting(createMeetingDto)
  }

}
