import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './modules/dtos/createuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './modules/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import { SignInDto } from './modules/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './modules/entities/refreshtoken.entity';
import { plainToInstance } from 'class-transformer';
import { SignInResponseDto } from './modules/dtos/signin-response.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { EncryptService } from './modules/utils/encrypt.service';
@Injectable()
export class AppService {
  constructor(
    private readonly encryptService: EncryptService,
    private jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @InjectRepository(UserAuth)
    private readonly userRepo: Repository<UserAuth>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userRepo.findOneBy({ email });
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await this.encryptService.hashPassword(password);
    const newUser = this.userRepo.create({
      email: email,
      password: hashedPassword,
    });


    console.log('salam 2')
    
    const createdUser = await this.userRepo.save(newUser);
console.log({salam: createdUser})


    const { id } = createdUser;
    
    const result = await firstValueFrom(
      this.userService
        .send({ cmd: 'create-user-profile' }, id)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );

    
    if (result) {
      return createdUser;
    }
    throw new Error('User not created');
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

  private async createRefreshToken(user: UserAuth): Promise<RefreshToken> {
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

  private async findUserWithTokens(email: string): Promise<UserAuth | null> {
    return this.userRepo.findOne({
      where: { email },
      relations: ['refreshTokens'], // Fetch related refresh tokens
    });
  }

  async validateUser(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepo.findOneBy({ email });

    if (!user || !(await this.encryptService.comparePasswords(password, user.password))) {
      return null;
    }

    return user;
  }
  
  async validateToken(token: string): Promise<UserAuth | null> {
    try {
      const decoded = this.jwtService.verify(token); 
      const user = await this.userRepo.findOneBy({ email: decoded.username });

      if (!user) {
        throw new RpcException('User not found');
      }

      return user; 
    } catch (error) {
      throw new RpcException('Invalid or expired token');
    }
  }
}
