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
import { catchError, firstValueFrom, from, throwError } from 'rxjs';
import { EncryptService } from './modules/utils/encrypt.service';
import { UUID  } from 'crypto';
import { UpdatePasswordDto } from './modules/dtos/updatePassword.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from './app.mailService';
import e from 'express';
import { Role } from './modules/entities/role.entity';
@Injectable()
export class AppService {
  constructor(
    private readonly encryptService: EncryptService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
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
      
      roleId: 1 ,
      email: email,
      password: hashedPassword,
    });


    
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
    const accessToken = this.generateAccessToken(user.email,user.id,user.roleId);

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

  private generateAccessToken(email: string , userId: string, role: number){
    const payload = { username: email,userId:userId ,role:role};
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
    console.log(token,"token from auth-ms");
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

   async updatePassword(data: any): Promise<UserAuth> {
    const user = await this.userRepo.findOne({ where: { id: data.userId } });

    if (!user) {
      throw new RpcException('User not found');
    }
    const hashedPassword = await this.encryptService.hashPassword(data.newPassword);
    user.password = hashedPassword; 

    try {
      await this.userRepo.save(user);
      return user; 
    } catch (error) {
      console.error('Error updating password:', error);
      throw new RpcException('Error updating password');
    }
  }
    // İstifadəçi email ilə tapılır
    async findUserByEmail(email: string) {
      return await this.userRepo.findOneBy({ email });
    }


  
  private async generateResetToken(userId: string): Promise<string> {
    const payload = { sub: userId }; 
    return this.jwtService.sign(payload, { expiresIn: '1h' }); 
  }

  private async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetLink = `https://your-frontend-url.com/reset-password?token=${resetToken}`;
    await this.mailService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`,
    });
  }


  async forgotPassword(email: string): Promise<any> {
    const user = await this.findUserByEmail(email); 
console.log({"mail from auth ms" :email})
    if (!user) {
      throw new RpcException('User not found');
    }

  
    const resetToken = await this.generateResetToken(user.id);

  
    await this.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'Password reset email sent successfully' };
  }

 
  async resetPassword(token: string, newPassword: string): Promise<any> {
    const decoded = await this.verifyResetToken(token); 

    if (!decoded) {
      throw new RpcException('Invalid or expired token');
    }

    const userId = decoded.sub;
    const hashedPassword = await this.hashPassword(newPassword); 

    
    await this.updatePassword({userId, newPassword: hashedPassword});

    return { message: 'Password reset successfully' };
  }


  private async verifyResetToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token); 
    } catch (error) {
      throw new RpcException('Invalid or expired token');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  }