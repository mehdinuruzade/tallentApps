import { Injectable, NotFoundException, Param } from '@nestjs/common';


@Injectable()
export class VideoService {

  private readonly jitsiUrl: string = process.env.JITSI_SERVER_URL || 'http://localhost:8000';

  


}
