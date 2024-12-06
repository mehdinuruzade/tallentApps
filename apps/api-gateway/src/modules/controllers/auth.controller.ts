import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/signin.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/register.dto';
import { register } from 'module';

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
}
