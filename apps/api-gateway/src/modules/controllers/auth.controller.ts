import { Controller, Post, Body, Headers, Put } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/signin.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/register.dto';
import { UpdatePasswordDto } from '../dtos/updatePassword.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })  
  @ApiResponse({ status: 201, description: 'The user has been created.' })  
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login') 
  @ApiOperation({ summary: 'Login user' })  
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })  
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })  
  async login(@Body() signInDto: SignInDto) {

    console.log(signInDto,"signInDto from api-gateway");
    return await this.authService.signIn(signInDto);
  }

  @Post('update-password')
  @ApiOperation({ summary: 'Reset password' })  
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })  
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })  
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Headers('Authorization') token: string,
  ) 
  {
    return this.authService.updatePassword(token, updatePasswordDto);
  }

  // Forgot Password API
  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password' })  
  @ApiResponse({ status: 200, description: 'Password reset email sent successfully.' })  
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })  
  async forgotPassword(@Body() body: { email: string }): Promise<any> {
    const { email } = body;

    // Auth Service'e müraciət edirik
    return await this.authService.sendPasswordResetEmail(email);
  }
}
