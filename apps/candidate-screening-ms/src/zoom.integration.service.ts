import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ZoomService {
  private readonly zoomBaseUrl = 'https://api.zoom.us/v2';
  private readonly accessToken = 'eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjgxNjQ5MzFlLTcwZTktNGRkOS04OTdhLTkyNTczNzkxYjU4ZiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJWak93XzZZZFNCV0UwWWdyUXp0S2hBIiwidmVyIjoxMCwiYXVpZCI6Ijg5OTNmOWI3MzRkY2I4OWZmYzljOWI1YTEzYzZhZmFlMTdhNDM3Yzc2NjA4NDhkZWM3YTQxZGY0MjY3Y2M2ZGUiLCJuYmYiOjE3MzcyOTI4NDYsImlzcyI6InptOmNpZDpZWHRjS2pDaFFGaVR4SERibzY5MnNBIiwiZ25vIjowLCJleHAiOjE3MzcyOTY0NDYsInR5cGUiOjIsImlhdCI6MTczNzI5Mjg0Nn0.M3hghB2hgEvaqssOVP71oIrvGcPrMBMn-lmwDpp3OjMQEKH3vsz5LRdqZVJcQz6o_nOqZIQc32y3LN_pmDP86A'; // OAuth-dan alınmış token

  constructor(private readonly httpService: HttpService) {}

  async createMeeting(candidateName: string, scheduleTime: Date): Promise<any> {
    const url = `${this.zoomBaseUrl}/users/me/meetings`;
    console.log("step1")
    console.log(Buffer.from('zNITfpxQTOOs0YgOpc1eg:4j0SkOhq7DSwzI1kwkVYeRSvmO4TtpZz').toString('base64'));


    const payload = {
      topic: `Interview with ${candidateName}`,
      type: 2, // Scheduled meeting
      start_time: scheduleTime.toISOString(),
      duration: 40, // Basic Plan limiti
      settings: {
        host_video: true,
        participant_video: true,
      },
    };
    console.log("step2", payload)

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
    console.log("step3",headers)

    const response = await firstValueFrom(
      this.httpService.post(url, payload, { headers }),
    );
    console.log("step4",response.statusText,response.status)
    return response.data;
  }

  async getMeeting(meetingId: string): Promise<any> {
    const url = `${this.zoomBaseUrl}/meetings/${meetingId}`;
  
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };
  
    const response = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );
    return response.data;
  }
  async getMeetingRecording(meetingId: string): Promise<any> {
    const url = `${this.zoomBaseUrl}/meetings/${meetingId}/recordings`;
  
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };
  
    const response = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );
    return response.data;
  }

}
