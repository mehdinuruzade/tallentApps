import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './modules/dtos/createuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './modules/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import {
  comparePasswords,
  hashPassword,
} from './modules/utils/encrypt.service';
import { SignInDto } from './modules/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './modules/entities/refreshtoken.entity';
import { plainToInstance } from 'class-transformer';
import { SignInResponseDto } from './modules/dtos/signin-response.dto';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userRepo.findOneBy({ email });
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await hashPassword(password);
    const newUser = this.userRepo.create({
      email: email,
      password: hashedPassword,
    });

    return await this.userRepo.save(newUser);
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.findUserWithTokens(signInDto.email);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate tokens
    await this.createRefreshToken(user);
    const accessToken = this.generateAccessToken(user.email);

    // Construct and transform response
    return plainToInstance(
      SignInResponseDto,
      { ...user, accessToken },
      { excludeExtraneousValues: true },
    );
  }

  private async createRefreshToken(user: User): Promise<RefreshToken> {
    const now = new Date();

    // Delete expired tokens for the user using userId
    await this.refreshTokenRepo.delete({
      user: user, // Use the foreign key directly
      expiresAt: LessThan(now), // Only delete expired tokens
    });

    // Create a new refresh token
    const payload = { username: user.email, sub: user.id };
    const refreshToken = new RefreshToken();
    refreshToken.token = this.jwtService.sign(payload, { expiresIn: '7d' });
    refreshToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    refreshToken.user = user;

    return this.refreshTokenRepo.save(refreshToken); // Save and return the refresh token
  }

  private generateAccessToken(email: string): string {
    const payload = { username: email };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  private async findUserWithTokens(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      relations: ['refreshTokens'], // Fetch related refresh tokens
    });
  }

  async validateUser(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepo.findOneBy({ email });

    if (!user || !(await comparePasswords(password, user.password))) {
      return null;
    }

    return user;
  }
}
