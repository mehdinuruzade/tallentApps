import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateMeetingDto } from '../dtos/createMeeting.dto';

@Injectable()
export class ZoomGatewayService {
    constructor(
        @Inject('CANDIDATE_SCREENING_SERVICE') private readonly candidateClient: ClientProxy,
      ) {}

  async createMeeting(createMeetingDto: CreateMeetingDto) {
    const pattern = { cmd: 'create-meeting' };
    const payload = {
      candidateName: createMeetingDto.candidateName,
      scheduleTime: createMeetingDto.scheduleTime,
    };

    return await firstValueFrom(
      this.candidateClient.send(pattern, payload),
    );
  }
}
