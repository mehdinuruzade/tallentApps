import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'talentazeapp@gmail.com',
      pass: 'krbk yxzg bzaw yflh',
    },
  });

  async sendMail(mailOptions: any) {
    await this.transporter.sendMail(mailOptions);
  }
}
