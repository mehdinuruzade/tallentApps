import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable() // Make the service injectable in NestJS
export class EncryptService {
  private readonly saltRounds: number = 12;

  constructor() {
    // You can initialize any properties here if necessary
  }

  // Hash the password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword;
  }

  // Compare plain password with the hashed password
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword); // Returns true if matched, false otherwise
  }
}